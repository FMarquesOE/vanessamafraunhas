<div align="center">

<img src="./public/fotos/Logo.webp" alt="Vanessa Mafra Unhas" width="110" />

# Vanessa Mafra · Alongamento de Unhas em Gel

**Landing page do estúdio Vanessa Mafra — Centro de Duque de Caxias, RJ**

[![Deploy](https://img.shields.io/badge/deploy-Vercel-000?logo=vercel)](https://vmafraunhas.com.br)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](#stack)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white)](#stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript&logoColor=white)](#stack)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss&logoColor=white)](#stack)

[Site em produção](https://vmafraunhas.com.br) · [Deploys](https://vercel.com/fmarquesprojetos/vanessa-mafra-nails) · [Repositório](https://github.com/FMarquesOE/vanessamafraunhas)

</div>

---

## Sumário

- [Sobre](#sobre)
- [Stack](#stack)
- [Começando](#começando)
- [Scripts](#scripts)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Configuração de conteúdo](#configuração-de-conteúdo)
- [SEO e prerender](#seo-e-prerender)
- [Imagens e performance](#imagens-e-performance)
- [Deploy](#deploy)
- [Fluxo de trabalho](#fluxo-de-trabalho)
- [Checklist antes do merge](#checklist-antes-do-merge)
- [Conformidade — pendências](#conformidade--pendências)
- [Manutenção](#manutenção)

---

## Sobre

Landing page de página única do estúdio de alongamento de unhas em gel da Vanessa Mafra. O objetivo de negócio é converter busca orgânica local e tráfego do Instagram em agendamentos pelo WhatsApp.

| | |
|---|---|
| **Cliente** | Vanessa Mafra — Alongamento de Unhas em Gel |
| **Domínio** | [vmafraunhas.com.br](https://vmafraunhas.com.br) (apex + `www`) |
| **Endereço** | Edifício Palácio Manom — Av. Dr. Manoel Teles, 31, sala 1203 — Centro — Duque de Caxias/RJ — CEP 25010-090 |
| **Arquitetura** | SPA de rota única. `#servicos`, `#sobre`, `#duvidas` e `#contato` são **âncoras**, não rotas |
| **Conversão** | `wa.me` com mensagem pré-preenchida (5 CTAs na página) |
| **Repositório** | [FMarquesOE/vanessamafraunhas](https://github.com/FMarquesOE/vanessamafraunhas) — público |
| **Responsável** | Felipe Marques ([@FMarquesOE](https://github.com/FMarquesOE)) |

---

## Stack

| Camada | Tecnologia | Observação |
|---|---|---|
| UI | React 19.2 + TypeScript 5.6.3 | `strict: true` |
| Build | Vite 7.1 | `root` = raiz, `build.outDir` = **`dist/public`** |
| Estilo | Tailwind CSS 4.1 (`@tailwindcss/vite`) | `client/src/index.css` |
| Componentes | Radix UI + shadcn/ui (`client/src/components/ui`) | |
| Roteamento | Wouter 3.10 (com patch pnpm) | Rota real: apenas `/` |
| Animação | Framer Motion 12 | |
| Prerender | Playwright + `@sparticuz/chromium` | `scripts/prerender.mjs`, roda no `postbuild` |
| Analytics | Vercel Analytics + GA4 (`G-51XVXT08GH`) | GA4 hardcoded em `index.html` |
| Hospedagem | Vercel — projeto `vanessa-mafra-nails` | Deploy automático da `main` |
| Gerenciador | **pnpm 10.4.1** (`packageManager`) | pnpm workspace de pacote único |

---

## Começando

**Pré-requisitos:** Node.js 22+ (a Vercel roda 24.x) e pnpm 10.4.1 — use `corepack enable` para casar a versão do `packageManager`.

```bash
git clone https://github.com/FMarquesOE/vanessamafraunhas.git
cd vanessamafraunhas
corepack enable
pnpm install
pnpm dev            # http://localhost:3000
```

> O projeto **não usa npm nem yarn**: há `pnpm-lock.yaml`, `pnpm-workspace.yaml` e uma dependência com patch (`wouter`). Instalar com npm quebra o patch.

### Variáveis de ambiente

Nenhuma variável é obrigatória hoje — não há `.env` em uso. O `envDir` do Vite aponta para a raiz; qualquer variável nova precisa do prefixo `VITE_` para chegar ao cliente. Segredos de produção vão em **Vercel → Settings → Environment Variables**, nunca no repositório.

---

## Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Vite dev server na porta 3000 com HMR e `--host` |
| `pnpm build` | Build de produção em `dist/public` |
| `pnpm postbuild` | Prerender da rota `/` + geração do `sitemap.xml` — **roda sozinho depois do `build`** |
| `pnpm preview` | Serve o build local pelo Vite |
| `pnpm serve:static` | Serve o build pelo Express (`server/index.ts`), útil para testar fallback de rota |
| `pnpm check` | `tsc --noEmit` — rodar sempre antes de commitar |
| `pnpm lint` | ESLint sobre `.ts`/`.tsx` |
| `pnpm format` | Prettier em todo o projeto |

---

## Estrutura do projeto

```
.
├── client/src/
│   ├── components/
│   │   ├── Hero.tsx            # hero + CTA principal (imagem LCP)
│   │   ├── Nav.tsx             # nav com hambúrguer no mobile
│   │   ├── PhotoFrame.tsx      # moldura de foto reaproveitável
│   │   ├── Map.tsx
│   │   ├── MapaLocalizacao.tsx # iframe do Google Maps
│   │   ├── ErrorBoundary.tsx
│   │   └── ui/                 # 60+ componentes shadcn/Radix
│   ├── contexts/ThemeContext.tsx
│   ├── hooks/                  # useMobile, useReveal, usePersistFn, useComposition
│   ├── lib/
│   │   ├── siteConfig.ts       # ← CONFIG: todo o conteúdo do site
│   │   ├── brand.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── modelo-1.tsx        # a página (rota "/")
│   │   └── NotFound.tsx        # lazy-loaded
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── fotos/                  # imagens + OG_Icon/ (favicons, webmanifest)
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── prerender.mjs           # prerender pós-build da rota /
│   └── sitemap.mjs             # gera dist/public/sitemap.xml com a data do build
├── docs/patches/               # patches já aplicados, mantidos como registro
├── patches/wouter@3.10.0.patch # patch de dependência (pnpm)
├── server/index.ts             # preview local via `pnpm serve:static` — não vai para o deploy
├── shared/const.ts
├── .github/workflows/ci.yml    # typecheck + lint + build + verificação do prerender
├── .eslintrc.cjs
├── vercel.json                 # build e output versionados
├── index.html                  # meta tags + JSON-LD (BeautySalon e FAQPage)
└── vite.config.ts
```

**Aliases:** `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`.

---

## Configuração de conteúdo

Praticamente todo o texto do site vive em **`client/src/lib/siteConfig.ts`**, no objeto `CONFIG`:

| Chave | Conteúdo |
|---|---|
| `nome`, `titulo`, `slogan`, `descricaoHero` | Cabeçalho e H1 |
| `endereco`, `enderecoMaps`, `enderecoMapsEmbed` | Bloco de localização e iframe |
| `whatsapp` | Número **com a mensagem já URL-encodada** |
| `instagram`, `horario`, `anoFundacao` | Rodapé e contato |
| `cores` | Paleta (`#F7F2EC`, `#796047`, `#d8c7b6`, `#4e3724`, `#A8B59E`) |
| `servicos[]` | 6 serviços: número, nome, descrição, duração, `src`, `aspectRatio` |
| `depoimentos[]` | 3 avaliações reais do Google |
| `duvidas[]` | 8 perguntas do FAQ |

**Para trocar conteúdo não é preciso abrir componente nenhum** — edite o `CONFIG`.

### ⚠️ Conteúdo duplicado que precisa andar junto

`index.html` tem uma cópia estática de parte desse conteúdo dentro do JSON-LD. Ao alterar qualquer um dos itens abaixo, **atualize os dois lugares**:

| Dado | `siteConfig.ts` | `index.html` (JSON-LD) |
|---|---|---|
| Depoimentos | `depoimentos[]` | `review[]` + `aggregateRating.reviewCount` |
| FAQ | `duvidas[]` | `FAQPage.mainEntity[]` |
| Horário | `horario` | `openingHoursSpecification` |
| Endereço / telefone | `endereco`, `whatsapp` | `address`, `telephone` |

> **NAP:** grafia correta do logradouro é **Manoel Teles**. Precisa bater com o Google Business Profile e com os agregadores. Divergência derruba SEO local.

---

## SEO e prerender

O site é uma SPA: sem prerender, o crawler recebe `<div id="root"></div>` vazio.

```
pnpm build      →  vite build          →  dist/public/
                →  postbuild           →  Playwright abre a preview,
                                          espera o React montar,
                                          grava o HTML renderizado
```

O `scripts/prerender.mjs` tem três travas que **falham o build** em vez de publicar página vazia:

1. `#root` vazio no HTML final → aborta;
2. HTML sem `aggregateRating` (JSON-LD perdido) → aborta;
3. `READY_SELECTOR` que ignora o container do `sonner` — `#root > *:not([aria-label^="Notifications"])`. Sem essa exclusão o `waitForSelector` estoura em timeout mesmo com a página montada (foi a causa do deploy `dpl_24iKbBgL...` ter falhado).

Só a rota `/` é pré-renderizada — as demais entradas do menu são âncoras.

### Structured data (`index.html`)

| Schema | Status |
|---|---|
| `BeautySalon` | ✅ com `geo`, `priceRange`, `openingHoursSpecification`, `sameAs` |
| `AggregateRating` | ✅ 5.0 / 3 avaliações |
| `Review` × 3 | ✅ depoimentos reais |
| `FAQPage` × 8 | ✅ |

> Pela política de *self-serving reviews* do Google, `Review` em `LocalBusiness`/`BeautySalon` **não** gera estrelas na busca orgânica. Está ali para consumo por LLMs/GEO — não espere rich snippet.

### Estado atual do on-page (verificado no deploy de produção)

- ✅ Um único `<h1>`: "Vanessa Mafra — Especialista no Alongamento de Unhas em Gel"
- ✅ H2s: Naturalidade / Serviços / Avaliações no Google Mapas / Dúvidas Frequentes / Venha nos visitar!
- ✅ `canonical` e `og:url` com barra final, alinhados ao `sitemap.xml`
- ✅ `alt` descritivo nas 4 imagens `<img>`
- ⚠️ Telefone aparece **só** dentro do `href` do `wa.me` — nunca em texto legível
- ⚠️ As 6 fotos de serviço são `background-image` CSS, não `<img>` — fora do Google Imagens

---

## Imagens e performance

- Hero (`ImgVanessa.webp`) com `<link rel="preload" as="image" fetchpriority="high">` e **sem** `loading="lazy"` — é o candidato a LCP.
- `loading="lazy"` só abaixo da dobra (`PhotoFrame`, logo do rodapé).
- Imagens de marca em **WebP**: `Logo.webp` (11 KB), `ImgVanessa.webp` (49 KB), `OEspaco.webp` (65 KB).
- Fotos de serviço ainda em `.jpeg` (~750 KB somados).
- ⚠️ `public/fotos` pesa **8,7 MB**, dos quais **6,6 MB são arquivos órfãos** — veja [Conformidade](#conformidade--pendências).

---

## Deploy

| Ambiente | Origem | URL |
|---|---|---|
| Produção | branch `main` | https://vmafraunhas.com.br |
| Preview | qualquer branch/PR | URL gerada pela Vercel |

```
Projeto:            vanessa-mafra-nails
Framework Preset:   Vite
Build Command:      pnpm build      (o postbuild dispara prerender + sitemap)
Output Directory:   dist/public
Node.js Version:    24.x
```

Build Command e Output Directory estão versionados em `vercel.json` — ele tem precedência sobre o painel, então a configuração vive no repositório, não no dashboard.

**Domínios apontados:** `vmafraunhas.com.br`, `www.vmafraunhas.com.br`, `vanessamafraunhas.vercel.app` e os dois aliases da Vercel.

> Para inspecionar o que a Vercel realmente serve, use a **URL do preview deployment**. Um fetch no domínio de produção pode devolver a casca não renderizada.

---

## Fluxo de trabalho

1. Branch a partir da `main`: `feat/…`, `fix/…` ou `seo/…`
2. `pnpm check` e `pnpm build` limpos (o build já roda o prerender)
3. Conferir o preview da Vercel **no celular** antes do merge
4. Merge na `main` → deploy automático

Alterações entregues como patch:

```bash
git apply --check correcoes-seo.patch   # valida contra o HEAD atual
git apply correcoes-seo.patch
```

---

## Checklist antes do merge

- [ ] `pnpm check` sem erros
- [ ] `pnpm build` conclui — inclusive o prerender, que **falha de propósito** se o HTML sair vazio ou sem JSON-LD
- [ ] Preview conferido em mobile (hambúrguer, hero vertical, grids, FAQ)
- [ ] Os 5 CTAs de WhatsApp abrem com a mensagem correta
- [ ] JSON-LD validado no [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Alterou depoimento, FAQ, horário, endereço ou telefone? Atualizou **`siteConfig.ts` e o JSON-LD do `index.html`**
- [ ] Nenhuma imagem nova em PNG/JPEG sem versão WebP
- [ ] Nenhum arquivo temporário, `.patch` ou `.diff` no commit

---

## Conformidade — pendências

Auditoria de 13/09/2026. **Os 5 bloqueadores e os 9 itens médios foram corrigidos.** O que ficou em aberto:

| # | Item | Por quê ainda não |
|---|---|---|
| 1 | GA4 sem camada de consentimento (LGPD) | Exige um banner de cookies na página — decisão de UX e de exposição que precisa passar pela cliente |
| 2 | Fotos de serviço em `background-image` CSS, não `<img>` | Ficam fora do Google Imagens e sem `alt` real. Conversão exige verificação visual; é o maior ganho de SEO ainda na mesa |
| 3 | Fotos de serviço em `.jpeg` (~750 KB somados) | Converter para WebP |
| 4 | Telefone só dentro do `href` do `wa.me` | Precisa aparecer em prosa legível para extração por LLM |
| 5 | Sem preços na página e sem presença em Booksy / GetNinjas / Achei o Profissional | Concorrentes locais estão nesses agregadores |
| 6 | Aviso de lint em `ThemeContext.tsx` (`react-refresh/only-export-components`) | `useTheme` sai de um arquivo de componente. Benigno; separar exige refactor de imports |

## Manutenção

**Trocar texto ou serviço:** editar `client/src/lib/siteConfig.ts` → `pnpm build` → conferir preview → merge.
**Trocar imagem:** exportar em WebP → colocar em `public/fotos` → atualizar `src` no `CONFIG` → conferir `alt` e `loading`.
**Atualizar depoimentos ou FAQ:** editar o `CONFIG` **e** o JSON-LD do `index.html`.
**Mudar horário ou endereço:** `CONFIG` + JSON-LD + Google Business Profile.

Contato técnico: Felipe Marques — [@FMarquesOE](https://github.com/FMarquesOE)

---

<div align="center">
<sub>Projeto privado. Conteúdo e imagens © Vanessa Mafra — Alongamento de Unhas em Gel.</sub>
</div>
