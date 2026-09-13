## O que muda

<!-- Uma ou duas frases. Se for correcao, diga qual era o comportamento errado. -->

## Como testar

<!-- Passos no preview da Vercel. -->

## Checklist

- [ ] `pnpm check` sem erros
- [ ] `pnpm lint` sem erros
- [ ] `pnpm build` conclui (o prerender falha de proposito se o HTML sair vazio ou sem JSON-LD)
- [ ] Preview conferido **no celular** (hamburguer, hero vertical, grids, FAQ)
- [ ] Os CTAs de WhatsApp abrem com a mensagem correta
- [ ] Mexeu em depoimento, FAQ, horario, endereco ou telefone? Atualizou **`client/src/lib/siteConfig.ts` e o JSON-LD do `index.html`**
- [ ] Imagem nova entrou em WebP
- [ ] Nenhum `.patch`, `.diff` ou arquivo temporario no commit
