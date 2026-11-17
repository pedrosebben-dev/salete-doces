# Salete Togni · Doces & Salgados

Site da confeitaria da Salete Togni, em Encantado/RS. Tem a vitrine com os doces que aparecem nos stories, uma calculadora de quantidades para festas e um pedido montado no próprio site que chega pronto no WhatsApp dela.

## Stack

- **Nuxt 4** (Vue 3 + TypeScript strict). A API é a mesma do Nuxt 3; o código fica dentro de `app/`.
- **Tailwind CSS 4**. Os tokens da marca (cores e fontes) estão em `app/assets/css/main.css`.
- **Pinia** para o pedido e **VueUse** para scroll, animação dos números e acessibilidade.
- **Vitest** para as regras de negócio (centos, calculadora, Natal, mensagem do WhatsApp).
- Fontes self-hosted via Fontsource: Fraunces, Norican e DM Sans.

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # testes (vitest)
npm run typecheck  # vue-tsc
npm run generate   # site estático em .output/public
```

## Publicar na Vercel (plano grátis)

O projeto já vem com `vercel.json`: a Vercel roda `npm run generate` e publica o site estático.
O endereço do site (Open Graph, sitemap e canonical) é preenchido sozinho com o domínio de produção da Vercel.

```bash
npm install
npx vercel --prod
```

Na primeira vez o CLI pede login (abre o navegador) e faz algumas perguntas: confirme com Enter e dê o nome `salete-togni` ao projeto, para o endereço ficar `salete-togni.vercel.app` (se estiver livre).

Para publicar sozinho a cada `git push`: suba o repositório no GitHub e rode `npx vercel git connect`, ou importe o repositório em vercel.com/new.

Depois:

1. Se registrar um domínio `.com.br` no registro.br, adicione em Project → Settings → Domains. O sitemap e o Open Graph passam a usar o domínio novo no próximo deploy.
2. Coloque o link do site na bio do Instagram.

Em outra hospedagem (Netlify, Cloudflare Pages), use `npm run generate`, publique `.output/public` e defina `NUXT_PUBLIC_SITE_URL=https://seu-dominio.com.br`.

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| WhatsApp, Instagram, cidade, período da seção de Natal | `app/data/site.ts` |
| Doces e salgados (nome, descrição, foto, de quanto em quanto aumenta) | `app/data/products.ts` |
| Tipos de festa | `app/data/events.ts` |
| Perguntas frequentes | `app/data/faq.ts` |
| Regra da calculadora (doces e salgados por convidado) | `app/utils/estimate.ts` |
| Cores e fontes | `app/assets/css/main.css` |

### Adicionar um doce novo

1. Recorte a foto em 4:5 e exporte em WebP com 480 e 960 px de largura, por exemplo `public/fotos/produtos/brigadeiro-de-ninho-480.webp` e `...-960.webp`.
2. Adicione um item em `app/data/products.ts` com `photo: 'brigadeiro-de-ninho'`.

Para aparecer na caixa do topo ou na faixa do Instagram, exporte também um recorte quadrado em `public/fotos/close/` (240 e 480 px) e preencha `closeUp`.

## Como o pedido funciona

- Nada vai para servidor. O pedido fica no navegador do cliente (localStorage) e vira uma mensagem pronta (`app/utils/whatsapp.ts`) que abre no `wa.me`.
- As quantidades seguem a lógica da confeitaria: de 50 em 50, mostradas em centos (`app/utils/quantity.ts`).
- A calculadora sugere 4 doces e 12 salgados por convidado (6 quando tem refeição) e arredonda para meio cento. O cliente pode levar a estimativa para o pedido e acompanhar quanto já escolheu.
- A seção de Natal aparece sozinha de 1/10 a 24/12, no horário de Brasília, com contagem regressiva (`app/utils/christmas.ts`). O site estático se atualiza no navegador, então ela some depois do Natal mesmo sem novo deploy.

## Métricas

`app/composables/useTrack.ts` dispara eventos (`whatsapp_click`, `add_to_order`, `send_order`, `use_estimate`, `copy_message`, `instagram_click`) quando GA4, Meta Pixel ou Google Tag Manager estão instalados. Instalando um deles dá para saber quantos pedidos saem do site.

## Conferir com a Salete antes de publicar

- Nomes e descrições dos doces. Foram escritos a partir das fotos dos stories.
- Se o passo de 50 em 50 vale para todos os itens.
- Se a regra da calculadora bate com o que ela recomenda.
- O site não fala em preço, prazo mínimo nem área de entrega: tudo fica "a combinar" pelo WhatsApp.

## Estrutura

```
app/
  assets/css/main.css    identidade (tokens, botões, papel pautado, bandeja)
  components/            seções da página, cards, gaveta do pedido
  composables/           assets com baseURL, scroll, métricas, estado de UI
  data/                  conteúdo editável (site, produtos, festas, FAQ)
  pages/index.vue        página + SEO (Open Graph, JSON-LD de confeitaria)
  plugins/               salva o pedido no navegador
  stores/order.ts        pedido (Pinia)
  utils/                 regras puras e testadas
server/routes/           sitemap.xml e robots.txt
tests/                   vitest
public/                  fotos em WebP, ilustrações, ícones, manifest
```

## Prévia em subpasta

`PREVIEW_BUILD=1 npm run generate` gera uma versão SPA que roda a partir de qualquer pasta. Serve só para prévias; para produção use o `npm run generate` normal, que gera HTML estático com SEO.
