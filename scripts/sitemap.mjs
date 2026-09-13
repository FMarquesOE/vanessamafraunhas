// scripts/sitemap.mjs
// Regera o sitemap no build com a data do deploy. Antes o lastmod era escrito
// a mao em public/sitemap.xml e envelhecia em silencio.
//
// Roda depois do prerender (ver "postbuild" no package.json) e sobrescreve a
// copia que o Vite ja copiou de public/ para dist/public/.
import path from "node:path";
import fsp from "node:fs/promises";

const SITE = "https://vmafraunhas.com.br";
const OUT = path.resolve(process.cwd(), "dist", "public", "sitemap.xml");

// O site tem uma unica rota real. "/servicos", "/sobre", "/duvidas" e
// "/contato" sao ancoras da mesma pagina — nao entram no sitemap.
const rotas = [{ loc: "/", changefreq: "weekly", priority: "1.0" }];

const lastmod = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rotas
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await fsp.mkdir(path.dirname(OUT), { recursive: true });
await fsp.writeFile(OUT, xml, "utf-8");
console.log(`\u2705 sitemap.xml gerado (${rotas.length} URL, lastmod ${lastmod})`);
