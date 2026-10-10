/**
 * GET /api/avaliacoes
 *
 * Busca nota, total e avaliações do salão na Places API (New) e devolve um
 * JSON enxuto para a seção de depoimentos do site.
 *
 * Variáveis de ambiente (Vercel → Settings → Environment Variables):
 *   GOOGLE_PLACES_KEY  chave restrita à "Places API (New)" — nunca use prefixo VITE_
 *   GOOGLE_PLACE_ID    ID do lugar (ChIJ…)
 *
 * Custo: pedir `reviews` cobra no SKU "Place Details Enterprise + Atmosphere"
 * (1.000 chamadas grátis/mês). O cache na CDN da Vercel (s-maxage de 6h) faz a
 * função ser chamada só algumas vezes por dia, independente do tráfego.
 */

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  googleMapsUri?: string;
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

export type Avaliacao = {
  autor: string;
  perfilUrl: string | null;
  foto: string | null;
  nota: number;
  texto: string;
  quando: string;
  publicadoEm: string | null;
  link: string | null;
};

export type AvaliacoesPayload = {
  nota: number | null;
  total: number | null;
  url: string | null;
  avaliacoes: Avaliacao[];
};

const FIELDS = "rating,userRatingCount,googleMapsUri,reviews";

function json(body: unknown, status: number, cache: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cache,
    },
  });
}

export async function GET(): Promise<Response> {
  const key = process.env.GOOGLE_PLACES_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return json({ erro: "configuracao_ausente" }, 500, "no-store");
  }

  const url =
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}` +
    `?languageCode=pt-BR&regionCode=BR`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": FIELDS },
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return json({ erro: "falha_de_rede" }, 502, "no-store");
  }

  if (!res.ok) {
    // Não repassa o corpo do erro do Google (pode citar o projeto/chave).
    console.error("Places API respondeu", res.status, await res.text());
    // Cache curto para um erro não virar uma enxurrada de chamadas pagas.
    return json({ erro: "places_api", status: res.status }, 502, "public, s-maxage=300");
  }

  const data = (await res.json()) as PlacesResponse;

  const payload: AvaliacoesPayload = {
    nota: data.rating ?? null,
    total: data.userRatingCount ?? null,
    url: data.googleMapsUri ?? null,
    avaliacoes: (data.reviews ?? []).map((r) => ({
      autor: r.authorAttribution?.displayName ?? "Cliente Google",
      perfilUrl: r.authorAttribution?.uri ?? null,
      foto: r.authorAttribution?.photoUri ?? null,
      nota: r.rating ?? 0,
      texto: (r.originalText?.text ?? r.text?.text ?? "").trim(),
      quando: r.relativePublishTimeDescription ?? "",
      publicadoEm: r.publishTime ?? null,
      link: r.googleMapsUri ?? null,
    })),
  };

  return json(payload, 200, "public, s-maxage=21600, stale-while-revalidate=86400");
}
