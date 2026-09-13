import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    // jsxLocPlugin injeta data-loc="arquivo:linha" em cada elemento JSX. E otimo
    // no desenvolvimento (da pra pular do elemento direto pro codigo), mas em
    // producao ele adicionava ~300 atributos ao HTML servido — 16% do peso da
    // pagina — e publicava a arvore inteira de client/src. So no dev server.
    ...(command === "serve" ? [jsxLocPlugin()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname),
  build: {
    // Precisa bater com o outputDirectory do vercel.json e com o OUT_DIR do
    // scripts/prerender.mjs.
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
