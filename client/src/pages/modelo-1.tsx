/**
 * ============================================================================
 * Vanessa Mafra · Especialista no Alongamento de Unhas em Gel
 * ============================================================================
 * VERSÃO MOBILE-RESPONSIVE
 * Projeto que adapta layout entre desktop e mobile.
 */
import {
  motion,
  useInView,
  Variants,
} from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import Nav from "@/components/Nav";
import PhotoFrame from "@/components/PhotoFrame";
import Hero, { RotatingSeal } from "@/components/Hero";
import MapaLocalizacao from "@/components/MapaLocalizacao";
import InstagramEmbed from "@/components/InstagramEmbed";
import { CONFIG } from "@/lib/siteConfig";
import type { AvaliacoesPayload } from "../../../api/avaliacoes";

// =============================================================================
// Variantes de animação
// =============================================================================
const vFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeIn" as const },
  },
};

const vStagger: Variants = {
  visible: { transition: { staggerChildren: 0.13 } },
};

// =============================================================================
// Scroll Reveal
// =============================================================================
function ScrollReveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={vFadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay, duration: 0.75, ease: "easeIn" }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// `RotatingSeal` is exported from `client/src/components/Hero.tsx`.

// =============================================================================
// Divisor filete
// =============================================================================
function Filete({ color = CONFIG.cores.acento }: { color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ height: 1, backgroundColor: color, opacity: 0.35 }} />
      <div style={{ height: 1, backgroundColor: color, opacity: 0.15 }} />
    </div>
  );
}

// =============================================================================
// Label de seção
// =============================================================================
function SectionLabel({
  numero,
  label,
  color = CONFIG.cores.acento,
  numeroColor,
  labelColor,
  as = "span",
  center = false,
}: {
  numero: string;
  label: string;
  color?: string;
  numeroColor?: string;
  labelColor?: string;
  as?: "span" | "h2";
  center?: boolean;
}) {
  const numberColor = numeroColor ?? color;
  const titleColor = labelColor ?? color;
  const LabelTag = as;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: center ? "center" : "flex-start",
        gap: 12,
        marginBottom: 28,
      }}
    >
      <span
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 10,
          opacity: 0.9,
          letterSpacing: "0.08em",
          color: numberColor,
        }}
      >
        {numero}
      </span>
      <div
        style={{ height: 1, width: 40, backgroundColor: color, opacity: 0.3 }}
      />
      <LabelTag
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          opacity: 0.8,
          whiteSpace: "pre-line",
          color: titleColor,
        }}
      >
        {label}
      </LabelTag>
    </div>
  );
}

// `Hero` is implemented in `client/src/components/Hero.tsx` and imported above.

// =============================================================================
// SOBRE
// =============================================================================
function SobreSection() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();

  return (
    <section
      id="sobre"
      style={{
        backgroundColor: c.fundo,
        padding: isMobile ? "72px 24px" : "120px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal>
          <Filete />
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 40 : 80,
            marginTop: isMobile ? 56 : 88,
            alignItems: "center",
            justifyItems: isMobile ? "center" : "stretch",
          }}
        >
          {/* Foto em arco — também visível no mobile */}
          <ScrollReveal>
            <div
              style={{ width: "100%", maxWidth: isMobile ? 360 : undefined }}
            >
              <PhotoFrame
                src="/fotos/OEspaco.webp"
                alt="Espaço da Vanessa Mafra para alongamento de unhas em gel em Duque de Caxias"
                arch
                aspectRatio={isMobile ? "4/5" : "3/4"}
                label="O Espaço"
                gradientFallback={`linear-gradient(145deg, ${c.fundoSecundario}, ${c.salvia}60)`}
              />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <SectionLabel numero="I" label="Sobre o Espaço" color={c.texto} />
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: isMobile
                    ? "clamp(32px, 10vw, 48px)"
                    : "clamp(34px, 3.8vw, 54px)",
                  fontWeight: 400,
                  color: c.texto,
                  lineHeight: 1.15,
                  marginBottom: 28,
                }}
              >
                Naturalidade
                <br />
                <em>que fala por si só</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p
                style={{
                  fontFamily: "DM Sans, Inter, sans-serif",
                  fontSize: isMobile ? 15 : 16,
                  lineHeight: 1.9,
                  color: c.texto,
                  opacity: 0.68,
                  marginBottom: 22,
                }}
              >
                O espaço Vanessa Mafra nasceu da crença de que beleza verdadeira
                é aquela que parece natural — como se sempre tivesse estado ali.
                Especialista de unhas em gel naturalista, cada atendimento é
                pensado nos mínimos detalhes.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p
                style={{
                  fontFamily: "DM Sans, Inter, sans-serif",
                  fontSize: isMobile ? 15 : 16,
                  lineHeight: 1.9,
                  color: c.texto,
                  opacity: 0.68,
                  marginBottom: 36,
                }}
              >
                Localizado no Centro de Duque de Caxias, o espaço foi desenhado
                para ser um refúgio — um momento só seu, do início ao fim.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: c.salvia,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: c.acento,
                    opacity: 0.65,
                  }}
                >
                  Especialista de Unhas em Gel
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SERVIÇOS
// =============================================================================
function ServicosSection() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();


  return (
    <section
      id="servicos"
      style={{
        backgroundColor: c.fundoSecundario,
        padding: isMobile ? "72px 24px" : "120px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <ScrollReveal>
          <SectionLabel
            numero="II"
            label={"Serviços"}
            color={c.fundo}
            as="h2"
          />
          <Filete />
        </ScrollReveal>

        <motion.div
          variants={vStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 2 : 2,
            marginTop: isMobile ? 40 : 64,
          }}
        >
          {CONFIG.servicos.map((s) => (
            <motion.div
              key={s.numero}
              variants={vFadeUp}
              style={{
                padding: isMobile ? "36px 24px" : "52px 48px",
                backgroundColor: c.fundo,
                border: `1px solid ${c.acento}18`,
                cursor: "default",
                transition: "background-color 400ms",
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.backgroundColor = c.acentoClaro)
              }
              onMouseLeave={e =>
                (e.currentTarget.style.backgroundColor = c.fundo)
              }
            >
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 16,
                  color: c.texto,
                  opacity: 0.7,
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 14,
                }}
              >
                {s.numero}
              </span>
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: isMobile ? 26 : 30,
                  fontWeight: 500,
                  color: c.texto,
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}
              >
                {s.nome}
              </h3>
              <p
                style={{
                  fontFamily: "DM Sans, Inter, sans-serif",
                  fontSize: isMobile ? 14 : 15,
                  lineHeight: 1.8,
                  color: c.texto,
                  opacity: 0.62,
                  marginBottom: 24,
                }}
              >
                {s.descricao}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    height: 1,
                    width: 24,
                    backgroundColor: c.texto,
                    opacity: 0.3,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: c.acento,
                    opacity: 0.65,
                  }}
                >
                  {s.duracao}
                </span>
              </div>
              {s.src && (
                <div
                  style={{
                    marginTop: 28,
                    maxHeight: isMobile ? undefined : 480,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={s.src}
                    alt={`${s.nome} — ${s.descricao}`}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={800}
                    className="servico-bg"
                    style={{
                      width: "100%",
                      aspectRatio: isMobile ? "1/1" : (s.aspectRatio ?? "4/3"),
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <a
              href={`https://wa.me/${CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: c.fundo,
                opacity: 0.8,
                textDecoration: "none",
                borderBottom: `1px solid ${c.texto}60`,
                paddingBottom: 3,
                transition: "opacity 300ms",
                display: "inline-block",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
            >
              Consultar disponibilidade via WhatsApp →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// =============================================================================
// DEPOIMENTOS
// =============================================================================
// Avaliações ao vivo do Google (via /api/avaliacoes, Places API New).
// Só exibimos avaliações com nota >= NOTA_MINIMA e com texto; se a API falhar
// ou estiver fora do ar, a seção continua com os depoimentos fixos do CONFIG
// (que também são o que o prerender grava no HTML).
const NOTA_MINIMA = 4;
const MAX_CARDS = 5; // a Places API (New) devolve no máximo 5

type CardDepoimento = {
  nome: string;
  texto: string;
  perfilUrl?: string | null;
  quando?: string;
};

function useAvaliacoesGoogle() {
  const [dados, setDados] = useState<AvaliacoesPayload | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/avaliacoes", { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<AvaliacoesPayload>) : null))
      .then((d) => {
        if (d && Array.isArray(d.avaliacoes)) setDados(d);
      })
      .catch(() => {
        /* sem API (dev local, erro, bloqueio): mantém os depoimentos fixos */
      });
    return () => ctrl.abort();
  }, []);

  return dados;
}

function Estrelas({ nota, size = 13 }: { nota: number; size?: number }) {
  const cheias = Math.round(nota);
  return (
    <span
      aria-hidden="true"
      style={{ letterSpacing: "0.12em", fontSize: size, color: CONFIG.cores.acento }}
    >
      {"★".repeat(cheias)}
      <span style={{ opacity: 0.25 }}>{"★".repeat(5 - cheias)}</span>
    </span>
  );
}

function DepoimentosSection() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();
  const google = useAvaliacoesGoogle();

  // A Places API (New) devolve até 5 avaliações ordenadas por relevância e não
  // aceita ordenação; aqui reordenamos essas 5 da mais recente para a mais antiga.
  const aoVivo: CardDepoimento[] = [...(google?.avaliacoes ?? [])]
    .sort((a, b) => (b.publicadoEm ?? "").localeCompare(a.publicadoEm ?? ""))
    .filter((a) => a.nota >= NOTA_MINIMA && a.texto.length > 0)
    .slice(0, MAX_CARDS)
    .map((a) => ({ nome: a.autor, texto: a.texto, perfilUrl: a.perfilUrl, quando: a.quando }));

  const usandoGoogle = aoVivo.length > 0;
  const cards: CardDepoimento[] = usandoGoogle ? aoVivo : CONFIG.depoimentos;
  const linkTodas = google?.url ?? CONFIG.enderecoMaps;

  return (
    <section
      style={{
        backgroundColor: c.fundo,
        padding: isMobile ? "72px 24px" : "120px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal>
          <SectionLabel
            numero="III"
            label={"Avaliações no Google Mapas"}
            as="h2"
          />
          <Filete />
        </ScrollReveal>

        {google?.nota != null && google.total != null && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: isMobile ? "6px 14px" : "8px 18px",
              marginTop: isMobile ? 28 : 40,
            }}
          >
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: isMobile ? 40 : 52,
                lineHeight: 1,
                color: c.texto,
              }}
            >
              {google.nota.toLocaleString("pt-BR", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </span>
            <Estrelas nota={google.nota} size={isMobile ? 16 : 18} />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: c.texto,
                opacity: 0.7,
              }}
            >
              {google.total} avaliações no Google
            </span>
            <a
              href={linkTodas}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: c.texto,
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Ver todas →
            </a>
          </div>
        )}

        <motion.div
          variants={vStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            // 2 por linha no desktop; se sobrar 1, ele fica centralizado na última linha
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? 16 : 32,
            marginTop: isMobile ? 40 : 64,
          }}
        >
          {cards.map((d) => (
            <motion.div
              key={`${d.nome}-${d.texto.slice(0, 24)}`}
              variants={vFadeUp}
              style={{
                padding: isMobile ? "28px 24px" : "40px 36px",
                border: `1px solid ${c.acento}20`,
                borderRadius: 4,
                minWidth: 0,
                boxSizing: "border-box",
                flex: isMobile ? "1 1 100%" : "0 1 calc((100% - 32px) / 2)",
              }}
            >
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 42,
                  color: c.acento,
                  opacity: 0.2,
                  lineHeight: 1,
                  marginBottom: 14,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: isMobile ? 17 : 19,
                  fontStyle: "italic",
                  lineHeight: 1.65,
                  color: c.texto,
                  opacity: 0.8,
                  marginBottom: 24,
                  display: "-webkit-box",
                  WebkitLineClamp: 7,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {d.texto}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div
                  style={{
                    height: 1,
                    width: 24,
                    backgroundColor: c.acento,
                    opacity: 0.3,
                  }}
                />
                {d.perfilUrl ? (
                  <a
                    href={d.perfilUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: c.texto,
                      opacity: 0.7,
                      textDecoration: "none",
                    }}
                  >
                    {d.nome}
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: c.texto,
                      opacity: 0.7,
                    }}
                  >
                    {d.nome}
                  </span>
                )}
                {d.quando && (
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      color: c.texto,
                      opacity: 0.6,
                    }}
                  >
                    · {d.quando}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {usandoGoogle && (
          <p
            style={{
              marginTop: 24,
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: c.texto,
              opacity: 0.6,
            }}
          >
            Avaliações do Google
          </p>
        )}
      </div>
    </section>
  );
}

// =============================================================================
// CURSO — Spa e Plástica dos Pés (divulgação, baseada no cartaz oficial)
// =============================================================================
// Paleta do site (CONFIG.cores) — mesma combinação usada em "Localização & Contato":
// fundo café (texto), destaques em areia (acentoClaro) e texto creme (fundo).
const CURSO_CORES = {
  fundo: CONFIG.cores.texto,
  fundo2: CONFIG.cores.fundoSecundario,
  destaque: CONFIG.cores.acentoClaro,
  claro: CONFIG.cores.fundo,
  apoio: CONFIG.cores.salvia,
};

function useIsNarrow(maxWidth = 1023) {
  const [narrow, setNarrow] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(max-width: ${maxWidth}px)`).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const onChange = () => setNarrow(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [maxWidth]);
  return narrow;
}

function CursoIcone({ tipo }: { tipo: string }) {
  const p = {
    fill: "none",
    stroke: CURSO_CORES.destaque,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      {tipo === "pratica" && (
        <>
          <circle cx="12" cy="12" r="8.5" {...p} />
          <path d="M12 7.5V12l3 2" {...p} />
        </>
      )}
      {tipo === "apostila" && (
        <>
          <path
            d="M3.5 6.5c2.8-1 5.6-1 8.5.8v11c-2.9-1.8-5.7-1.8-8.5-.8z"
            {...p}
          />
          <path
            d="M20.5 6.5c-2.8-1-5.6-1-8.5.8v11c2.9-1.8 5.7-1.8 8.5-.8z"
            {...p}
          />
          <path d="M6 10h3.5M6 13h3.5M14.5 10H18M14.5 13H18" {...p} />
        </>
      )}
      {tipo === "precificacao" && (
        <>
          <path d="M5 19v-4M10 19v-7M15 19v-5M20 19V9" {...p} />
          <path d="M4 11l5-4 4 3 6-6M15.5 4H19v3.5" {...p} />
        </>
      )}
    </svg>
  );
}

function CursoSection() {
  const g = CURSO_CORES;
  const curso = CONFIG.curso;
  const isMobile = useIsMobile();
  const narrow = useIsNarrow();

  const destaqueTexto: React.CSSProperties = { color: g.destaque };
  const seloTam = isMobile ? 104 : 132;

  const blocoTitulo = (
    <>
      <ScrollReveal>
        <h3
          style={{
            margin: 0,
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: "0.01em",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: isMobile ? 44 : 68,
              textTransform: "uppercase",
              color: g.claro,
            }}
          >
            {curso.titulo}
          </span>
          <span
            style={{
              display: "block",
              fontSize: isMobile ? 58 : 92,
              fontStyle: "italic",
              fontWeight: 400,
              marginTop: isMobile ? 2 : 4,
              paddingBottom: 6,
              ...destaqueTexto,
            }}
          >
            {curso.tituloDestaque}
          </span>
        </h3>
        <p
          style={{
            fontFamily: "DM Sans, Inter, sans-serif",
            fontSize: isMobile ? 15.5 : 17,
            lineHeight: 1.7,
            color: g.claro,
            opacity: 0.78,
            margin: isMobile ? "20px 0 0" : "28px 0 0",
            maxWidth: 520,
          }}
        >
          {curso.subtitulo}
        </p>
      </ScrollReveal>
    </>
  );

  const blocoModulos = (
    <>
      <motion.ul
        variants={vStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          listStyle: "none",
          padding: 0,
          margin: isMobile ? "36px 0 0" : "44px 0 0",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {curso.modulos.map(m => (
          <motion.li
            key={m.titulo}
            variants={vFadeUp}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: isMobile ? 16 : 22,
              padding: isMobile ? "18px 0" : "22px 0",
              borderTop: `1px solid ${g.destaque}26`,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: isMobile ? 46 : 52,
                height: isMobile ? 46 : 52,
                borderRadius: "50%",
                border: `1px solid ${g.destaque}`,
                boxShadow: `inset 0 0 0 3px ${g.fundo}, inset 0 0 0 4px ${g.destaque}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CursoIcone tipo={m.icone} />
            </span>
            <div>
              <h4
                style={{
                  margin: 0,
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? 12 : 13,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: g.destaque,
                }}
              >
                {m.titulo}
              </h4>
              <p
                style={{
                  margin: "6px 0 0",
                  fontFamily: "DM Sans, Inter, sans-serif",
                  fontSize: isMobile ? 14.5 : 15.5,
                  lineHeight: 1.6,
                  color: g.claro,
                  opacity: 0.7,
                }}
              >
                {m.texto}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );

  const blocoVisual = (
    <>
      <ScrollReveal
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <figure
          style={{
            position: "relative",
            margin: 0,
            width: "100%",
            maxWidth: isMobile ? 360 : 460,
          }}
        >
          <div
            style={{
              padding: isMobile ? 8 : 10,
              backgroundColor: g.claro,
              transform: "rotate(-2.5deg)",
              boxShadow: `0 30px 60px -20px rgba(0,0,0,.55), 0 0 0 1px ${g.destaque}60`,
            }}
          >
            <img
              src={curso.imagemAntesDepois}
              alt="Antes e depois de calcanhar com rachaduras tratado com a técnica de Plástica dos Pés"
              width={796}
              height={688}
              loading="lazy"
              decoding="async"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
          {/* Selo da marca: o mesmo selo giratório do site, com o monograma VM */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: seloTam,
              height: seloTam,
              right: isMobile ? -14 : -44,
              top: isMobile ? -40 : -58,
              borderRadius: "50%",
              backgroundColor: g.claro,
              border: `1px solid ${g.destaque}`,
              boxShadow: "0 14px 30px -12px rgba(0,0,0,.45)",
            }}
          >
            <div
              style={{
                width: 160,
                height: 160,
                transform: `scale(${seloTam / 160})`,
                transformOrigin: "top left",
              }}
            >
              <RotatingSeal size={160} color={g.fundo} />
            </div>
            <img
              src="/fotos/Logo.webp"
              alt=""
              width={260}
              height={260}
              loading="lazy"
              decoding="async"
              style={{
                position: "absolute",
                width: seloTam * 0.42,
                height: seloTam * 0.42,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <figcaption
            style={{
              marginTop: isMobile ? 26 : 32,
              textAlign: "center",
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              fontSize: isMobile ? 19 : 22,
              lineHeight: 1.35,
              color: g.destaque,
              padding: isMobile ? "0 36px" : "0 40px",
            }}
          >
            {curso.chamada}
          </figcaption>
        </figure>
      </ScrollReveal>
    </>
  );

  const blocoInvestimento = (
    <>
      <ScrollReveal style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
        <div
          style={{
            border: `1px solid ${g.destaque}`,
            borderRadius: 6,
            padding: isMobile ? "24px 18px 26px" : "30px 36px 32px",
            background: `linear-gradient(180deg, ${g.fundo2}cc 0%, ${g.fundo}f2 100%)`,
            boxShadow: `0 0 0 4px ${g.fundo}, 0 0 0 5px ${g.destaque}40`,
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: g.destaque,
              opacity: 0.9,
            }}
          >
            Valor de investimento
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              marginTop: 18,
            }}
          >
            {curso.precos.map((p, i) => (
              <Fragment key={p.forma}>
                {i === 1 && (
                  <div
                    aria-hidden="true"
                    style={{
                      width: 1,
                      alignSelf: "stretch",
                      background: `linear-gradient(180deg, transparent, ${g.destaque}99, transparent)`,
                      margin: isMobile ? "0 12px" : "0 24px",
                    }}
                  />
                )}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "flex-start",
                      fontFamily: "Cormorant Garamond, serif",
                      fontWeight: 600,
                      lineHeight: 1,
                      ...destaqueTexto,
                    }}
                  >
                    <span
                      style={{
                        fontSize: isMobile ? 16 : 20,
                        marginTop: isMobile ? 8 : 12,
                        marginRight: 4,
                      }}
                    >
                      R$
                    </span>
                    <span style={{ fontSize: isMobile ? 48 : 64 }}>
                      {p.valor}
                    </span>
                    <span
                      style={{
                        fontSize: isMobile ? 18 : 24,
                        marginTop: isMobile ? 6 : 8,
                      }}
                    >
                      ,{p.centavos}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? 10 : 11,
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: g.claro,
                      opacity: 0.75,
                    }}
                  >
                    {p.forma}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "22px 0 0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "8px 14px" : "8px 22px",
          }}
        >
          {curso.beneficios.map(b => (
            <li
              key={b}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 10 : 10.5,
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: g.claro,
                opacity: 0.8,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 5,
                  height: 5,
                  transform: "rotate(45deg)",
                  backgroundColor: g.destaque,
                }}
              />
              {b}
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? 18 : 28,
            marginTop: isMobile ? 30 : 34,
          }}
        >
          <a
            href={`https://wa.me/${curso.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              width: isMobile ? "100%" : "auto",
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: g.fundo,
              backgroundColor: g.destaque,
              padding: "16px 30px",
              borderRadius: 2,
              textDecoration: "none",
              transition: "background-color 350ms",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = g.claro;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = g.destaque;
            }}
          >
            Quero garantir minha vaga
          </a>
          <a
            href={`https://forms.gle/gtpvc7myGjSPkX9g8`}
            target="_blank"
            rel="noopener"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: g.destaque,
              textDecoration: "none",
              borderBottom: `1px solid ${g.destaque}80`,
              paddingBottom: 3,
              opacity: 0.85,
            }}
          >
            Cadastre-se aqui para as próximas turmas! →
          </a>
        </div>
      </ScrollReveal>
    </>
  );

  return (
    <section
      id="curso"
      aria-label="Curso presencial de Spa e Plástica dos Pés"
      style={{
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(120% 80% at 85% 10%, ${g.fundo2} 0%, ${g.fundo} 55%), ${g.fundo}`,
        color: g.claro,
        padding: isMobile ? "72px 24px 80px" : "120px 80px",
      }}
    >
      {/* brilho dourado difuso, eco do cartaz */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: isMobile ? 360 : 640,
          height: isMobile ? 360 : 640,
          right: isMobile ? -160 : -120,
          bottom: isMobile ? -140 : -220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${g.fundo2}55 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <ScrollReveal>
          <SectionLabel
            numero="IV"
            label={curso.modalidade}
            color={g.destaque}
            labelColor={g.destaque}
            as="h2"
          />
          <Filete color={g.destaque} />
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: narrow
              ? "minmax(0, 1fr)"
              : "minmax(0, 1.05fr) minmax(0, 0.95fr)",
            gap: narrow ? 48 : 80,
            alignItems: "center",
            marginTop: isMobile ? 40 : 64,
          }}
        >
          {narrow ? (
            <>
              {blocoTitulo}
              {blocoVisual}
              {blocoModulos}
              {blocoInvestimento}
            </>
          ) : (
            <>
              <div>
                {blocoTitulo}
                {blocoModulos}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 48,
                }}
              >
                {blocoVisual}
                {blocoInvestimento}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// DÚVIDAS FREQUENTES
// =============================================================================
function FaqItem({
  numero,
  pergunta,
  resposta,
  isOpen,
  onToggle,
  c,
  isMobile,
}: {
  numero: string;
  pergunta: string;
  resposta: string;
  isOpen: boolean;
  onToggle: () => void;
  c: typeof CONFIG.cores;
  isMobile: boolean;
}) {
  return (
    <motion.div
      variants={vFadeUp}
      style={{
        backgroundColor: c.fundo,
        border: `1px solid ${c.acento}18`,
      }}
    >
      <h3 style={{ margin: 0 }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          padding: isMobile ? "22px 24px" : "28px 40px",
          background: "none",
          border: "none",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 15,
              color: c.texto,
              opacity: 0.5,
              letterSpacing: "0.08em",
            }}
          >
            {numero}
          </span>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: isMobile ? 19 : 22,
              fontWeight: 500,
              color: c.texto,
              lineHeight: 1.3,
            }}
          >
            {pergunta}
          </span>
        </div>
        <span
          style={{
            flexShrink: 0,
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: `1px solid ${c.texto}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            color: c.texto,
            opacity: 0.7,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 300ms",
          }}
        >
          +
        </span>
      </button>
      </h3>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <p
          style={{
            fontFamily: "DM Sans, Inter, sans-serif",
            fontSize: isMobile ? 14.5 : 15.5,
            lineHeight: 1.8,
            color: c.texto,
            opacity: 0.65,
            padding: isMobile ? "0 24px 24px 24px" : "0 40px 32px 74px",
          }}
        >
          {resposta}
        </p>
      </motion.div>
    </motion.div>
  );
}

function DuvidasSection() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="duvidas"
      style={{
        backgroundColor: c.fundoSecundario,
        padding: isMobile ? "72px 24px" : "120px 80px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <ScrollReveal>
          <SectionLabel
            numero="V"
            label={"Dúvidas Frequentes"}
            color={c.fundo}
            as="h2"
          />
          <Filete />
        </ScrollReveal>

        <motion.div
          variants={vStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: isMobile ? 40 : 64,
          }}
        >
          {CONFIG.duvidas.map((d, index) => (
            <FaqItem
              key={d.pergunta}
              numero={String(index + 1).padStart(2, "0")}
              pergunta={d.pergunta}
              resposta={d.resposta}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              c={c}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <span
              style={{
                fontFamily: "DM Sans, Inter, sans-serif",
                fontSize: isMobile ? 14 : 15,
                color: c.fundo,
                opacity: 0.7,
                display: "block",
                marginBottom: 18,
              }}
            >
              Ainda ficou com alguma dúvida?
            </span>
            <a
              href={`https://wa.me/${CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: c.fundo,
                opacity: 0.85,
                textDecoration: "none",
                borderBottom: `1px solid ${c.fundo}60`,
                paddingBottom: 3,
                transition: "opacity 300ms",
                display: "inline-block",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
            >
              Falar no WhatsApp →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// =============================================================================
// CONTATO
// =============================================================================
function ContatoSection() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();

  return (
    <section
      id="contato"
      style={{
        backgroundColor: c.texto,
        padding: isMobile ? "72px 24px" : "120px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            justifyItems: "center",
            gap: isMobile ? 48 : 40,
            alignItems: "center",
          }}
        >
          <div
            style={{
              minWidth: 0,
              maxWidth: 640,
              width: "100%",
              textAlign: "center",
            }}
          >
            <ScrollReveal>
              <SectionLabel
                numero="VI"
                label="Localização & Contato"
                color={c.fundo}
                center
              />
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: isMobile
                    ? "clamp(32px, 10vw, 48px)"
                    : "clamp(34px, 3.8vw, 54px)",
                  fontWeight: 400,
                  color: c.fundo,
                  lineHeight: 1.15,
                  marginBottom: isMobile ? 32 : 44,
                }}
              >
                Venha nos <em style={{ color: c.acentoClaro }}>visitar!</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  marginBottom: 40,
                }}
              >
                {[
                  { label: "Endereço", valor: CONFIG.endereco },
                  { label: "Horário", valor: CONFIG.horario },
                  { label: "Instagram", valor: CONFIG.instagram },
                ].map(({ label, valor }) => (
                  <div key={label} style={{ minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: c.acentoClaro,
                        opacity: 0.55,
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </span>
                    {label === "Endereço" ? (
                      <>
                        <a
                          href={CONFIG.enderecoMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "DM Sans, Inter, sans-serif",
                            fontSize: isMobile ? 15 : 16,
                            color: c.fundo,
                            opacity: 0.7,
                            lineHeight: 1.5,
                            display: "inline-block",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {valor}
                        </a>
                        <div style={{ margin: "12px auto 0", maxWidth: 420 }}>
                          <MapaLocalizacao
                            embedUrl={CONFIG.enderecoMapsEmbed}
                          />
                        </div>
                      </>
                    ) : label === "Instagram" ? (
                      <>
                        <a
                          href={`https://instagram.com/${CONFIG.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "DM Sans, Inter, sans-serif",
                            fontSize: isMobile ? 15 : 16,
                            color: c.fundo,
                            opacity: 0.7,
                            lineHeight: 1.5,
                            display: "inline-block",
                            textDecoration: "none",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {valor}
                        </a>
                        <div style={{ marginTop: 16, width: "100%" }}>
                          <InstagramEmbed
                            permalink="https://www.instagram.com/p/DQci7VkEXzA/"
                            captionHtml="Um post compartilhado por Vanessa Mafra | Manicure | Nail Designer | Duque de Caxias 📍 (@vanessamafra_especialistanails)"
                          />
                        </div>
                      </>
                    ) : (
                      <span
                        style={{
                          fontFamily: "DM Sans, Inter, sans-serif",
                          fontSize: isMobile ? 15 : 16,
                          color: c.fundo,
                          opacity: 0.7,
                          lineHeight: 1.5,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {valor}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <a
                href={`https://wa.me/${CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: c.texto,
                  backgroundColor: c.acentoClaro,
                  padding: isMobile ? "16px 24px" : "16px 40px",
                  borderRadius: 2,
                  textDecoration: "none",
                  display: isMobile ? "block" : "inline-block",
                  textAlign: isMobile ? "center" : "left",
                  transition: "background-color 350ms",
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.backgroundColor = c.fundo)
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.backgroundColor = c.acentoClaro)
                }
              >
                Agende agora pelo WhatsApp
              </a>
            </ScrollReveal>
          </div>

          {/* Selo giratório — visível apenas no mobile */}
          {isMobile && (
            <ScrollReveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RotatingSeal size={160} color={c.acentoClaro} />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER
// =============================================================================
function Footer() {
  const c = CONFIG.cores;
  const isMobile = useIsMobile();

  return (
    <footer
      style={{
        backgroundColor: "black",
        borderTop: `1px solid ${c.fundo}18`,
        padding: isMobile ? "24px 20px" : "28px 80px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: "center",
        gap: isMobile ? 20 : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          backgroundColor: "rgba(255, 255, 255, 0.82)", // ← máscara branca (opacidade elevada de 0.5 para 0.82: contraste do texto sobre o fundo preto não atingia 4.5:1)
          borderRadius: 45, // ← bordas arredondadas
          padding: isMobile ? "6px 12px" : "8px 16px", // ← espaço interno
        }}
      >
        <div style={{ width: isMobile ? 40 : 60, height: isMobile ? 40 : 60 }}>
          <img
            src="/fotos/Logo.webp"
            alt="Vanessa Mafra Unhas"
            loading="lazy"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 16,
            fontStyle: "bold",
            color: c.texto, // ← trocado de c.fundo para ficar legível sobre fundo branco
            lineHeight: 3,
          }}
        >
          {CONFIG.nome}
        </span>
      </div>

      <div
        style={{
          color: "white",
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          lineHeight: 1.8,
          textAlign: isMobile ? "center" : "right",
          opacity: 0.9,
        }}
      >
        <div>© {CONFIG.anoFundacao} · Todos os direitos reservados</div>
        <div>
          Administrado por{" "}
          <a
            href="https://wa.me/5521976822900?text=Ol%C3%A1...%20Quero%20saber%20mais%20sobre%20seus%20servi%C3%A7os!%20%F0%9F%9A%80."
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Marques Tech
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
// =============================================================================
// Página principal
// =============================================================================
export default function Modelo1() {
  const c = CONFIG.cores;
  return (
    <div style={{ backgroundColor: c.fundo, minHeight: "100vh" }}>
      <Nav />
      <main>
        <Hero />
        <SobreSection />
        <ServicosSection />
        <DepoimentosSection />
        <CursoSection />
        <DuvidasSection />
        <ContatoSection />
      </main>
      <Footer />
    </div>
  );
}
