# Embed do Instagram na seção de Contato

Adiciona o embed oficial do reel do Instagram (@nossoespacoduquedecaxias) logo
abaixo do link `@vanessamafra_especialistanails` na seção "Localização & Contato".

## O que muda

- **Novo arquivo:** `client/src/components/InstagramEmbed.tsx` — componente que
  injeta o blockquote oficial da Meta e carrega `embed.js` uma única vez,
  chamando `window.instgrm.Embeds.process()` para renderizar o post (funciona
  corretamente numa SPA, mesmo se o script já estiver em cache de uma
  navegação anterior).
- **Editado:** `client/src/pages/modelo-1.tsx` — dentro do bloco "Instagram"
  da seção de contato, o link do @ agora é seguido pelo `<InstagramEmbed />`
  com o permalink `https://www.instagram.com/reel/Da-ejdsI5S-/`.

## Como aplicar

Na raiz do repositório (`vanessamafraunhas`):

```bash
git checkout main && git pull
git apply --check 0001-adiciona-embed-instagram-contato.patch   # valida antes
git apply 0001-adiciona-embed-instagram-contato.patch
```

Depois:

```bash
pnpm install   # se ainda não tiver as deps
pnpm run build # ou pnpm run dev para conferir localmente
```

## Validado neste ambiente

- `tsc --noEmit` — sem erros de tipo
- `eslint` nos dois arquivos — sem avisos
- `vite build` — build de produção concluído com sucesso

(O passo de `postbuild`/prerender falhou apenas por falta do binário do
Chromium headless-shell do Playwright neste ambiente de verificação — não
tem relação com esta mudança.)
