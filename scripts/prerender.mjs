// scripts/prerender.mjs
import { chromium } from "playwright";
import chromiumPack from "@sparticuz/chromium";
import path from "path";
import { preview } from "vite";
import fs from "node:fs";
import fsp from "node:fs/promises";

// O site é uma pagina unica (ver client/src/App.tsx: so existe <Route path="/" .../>).
// "/servicos", "/sobre" e "/contato" sao ancoras (#servicos, #sobre, #contato) da MESMA
// pagina, nao rotas separadas — por isso so pre-renderizamos "/".
const routes = ["/"];

// IMPORTANTE: precisa bater com build.outDir do vite.config.ts ("dist/public").
// Antes o script gravava em "dist/", um diretorio que a Vercel nao serve — o prerender
// rodava, dizia "OK", e o que ia pro ar era o index.html cru do Vite (root vazio).
const OUT_DIR = path.resolve(process.cwd(), "dist", "public");

// Seletor que so existe depois do React montar. Se ele nao aparecer, o prerender
// capturou a casca vazia e o build deve falhar em vez de publicar uma pagina sem conteudo.
//
// (O <Toaster /> do sonner, que antes montava um <section aria-label="Notifications...">
// vazio como primeiro filho de #root e exigia excluir esse container aqui, foi removido
// de App.tsx — nenhuma tela chama toast(), então era só JS morto. Sem ele, "#root > *"
// já aponta direto pro conteudo real da pagina.)
const READY_SELECTOR = "#root > *";

async function launchBrowser() {
  const isVercel = !!process.env.VERCEL;

  if (isVercel) {
    // Desativa o stack de WebGL/GPU (swiftshader/angle). A página não precisa disso
    // pra pré-renderizar HTML estático, e é o que está causando os crashes
    // "SharedImageManager::ProduceSkia: ... non-existent mailbox" no modo --single-process
    // da Vercel, que derrubam o browser inteiro depois da primeira página.
    // Atenção: é uma propriedade (setter), não um método — nada de "()" no final.
    chromiumPack.setGraphicsMode = false;

    const executablePath = await chromiumPack.executablePath();
    const execDir = path.dirname(executablePath);

    // O @sparticuz/chromium já detecta Vercel+Node>=20 sozinho e configura
    // LD_LIBRARY_PATH apontando para /tmp/al2023/lib (onde ficam libnspr4.so, libnss3.so
    // etc) assim que o módulo é importado. Por isso aqui é preciso ADICIONAR o execDir
    // (onde fica o binário do chromium e as libs do swiftshader), nunca sobrescrever —
    // sobrescrever apaga o /tmp/al2023/lib e derruba o processo com
    // "libnspr4.so: cannot open shared object file".
    const existingLibPaths = (process.env.LD_LIBRARY_PATH || "")
      .split(":")
      .filter(Boolean);
    if (!existingLibPaths.includes(execDir)) {
      process.env.LD_LIBRARY_PATH = [...existingLibPaths, execDir].join(":");
    }

    return await chromium.launch({
      // Corrigido: era "--disable--dev-shm-usage" (dois hifens no meio), flag invalida
      // que o Chromium descarta silenciosamente.
      args: [...chromiumPack.args, "--disable-dev-shm-usage", "--no-sandbox"],
      executablePath,
      headless: true,
    });
  }

  // Desenvolvimento local
  return await chromium.launch({ headless: true });
}

async function prerender() {
  if (!fs.existsSync(OUT_DIR)) {
    throw new Error(
      `Diretorio de build nao encontrado: ${OUT_DIR}. Rode "vite build" antes do prerender.`,
    );
  }

  const previewServer = await preview({ preview: { port: 4173 } });
  const baseUrl = "http://localhost:4173";
  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    for (const route of routes) {
      // "networkidle" espera a rede sossegar; "domcontentloaded" (usado antes)
      // dispara ANTES do React montar e captura o <div id="root"></div> vazio.
      await page.goto(baseUrl + route, {
        waitUntil: "networkidle",
        timeout: 60000,
      });

      // Garantia extra: so segue quando o React realmente renderizou algo.
      await page.waitForSelector(READY_SELECTOR, { timeout: 30000 });

      const html = await page.content();

      // Falha alto e claro em vez de publicar uma casca vazia.
      if (/<div id="root">\s*<\/div>/.test(html)) {
        throw new Error(
          `Prerender de "${route}" gerou #root vazio — abortando o build.`,
        );
      }
      if (!html.includes("aggregateRating")) {
        throw new Error(
          `Prerender de "${route}" perdeu o JSON-LD do <head> — abortando o build.`,
        );
      }

      const outDir =
        route === "/" ? OUT_DIR : path.join(OUT_DIR, route.replace(/^\//, ""));
      await fsp.mkdir(outDir, { recursive: true });
      await fsp.writeFile(path.join(outDir, "index.html"), html, "utf-8");

      const kb = (Buffer.byteLength(html, "utf-8") / 1024).toFixed(1);
      console.log(
        `✅ Pré-renderizado: ${route} -> ${path.join(outDir, "index.html")} (${kb} KB)`,
      );
    }
  } finally {
    await page.close().catch(() => {});
    await browser.close().catch(() => {});
    previewServer.httpServer.close();
  }
}

prerender().catch((err) => {
  console.error("❌ Prerender falhou:", err);
  // Sai com codigo != 0 para o build da Vercel falhar de forma visivel,
  // em vez de publicar silenciosamente uma pagina sem conteudo.
  process.exit(1);
});
