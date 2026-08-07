# Ofício Barbearia — Landing Page

Landing page premium para barbearia, desenvolvida em HTML5, CSS3 e JavaScript ES6 puros (sem frameworks ou bibliotecas externas). Conversão principal: agendamento via WhatsApp.

## Estrutura do projeto

```
LP-Barbearia/
├── index.html          # Página única, todas as seções
├── style.css            # Tokens de design, componentes e responsividade
├── script.js             # Módulos JS: navbar, reveal, contadores, FAQ, galeria, sliders
├── robots.txt
├── sitemap.xml
├── manifest.json
├── README.md
└── assets/
    ├── img/             # Espaço para fotografias reais do estúdio
    ├── icons/           # Ícones auxiliares (os principais estão inline em SVG)
    ├── logo/logo.svg
    └── favicon/
        ├── favicon.svg
        └── apple-touch-icon.png  # (adicionar PNG 180×180 real antes do deploy)
```

## Conceito de design

- **Paleta**: preto fosco (`#0B0B0C`), grafite (`#1A1917` / `#232220`), marfim (`#F3EFE7`), branco (`#FFFFFF`), latão (`#A9814B` / `#C9A566`) e um acento oxblood discreto (`#6E2A32`) usado apenas no "carimbo" do elemento-assinatura.
- **Tipografia**: `Bebas Neue` para títulos de impacto, `Manrope` para leitura corrida, `Space Mono` para dados, rótulos e o motivo de "senha/ticket".
- **Elemento-assinatura**: a página inteira é organizada ao redor da metáfora da *senha de atendimento* — o cartão da hero, os números de passo e os rótulos técnicos remetem à ideia de reserva de vaga, reforçando a mensagem de "hora marcada, sem fila".
- **Movimento**: scroll reveal discreto, contadores animados ao entrar em viewport, navbar que ganha fundo ao rolar, hover elegante em cards, slider de depoimentos com autoplay pausável e comparador antes/depois com arraste.

## Imagens

O projeto foi entregue com placeholders visuais (gradientes e SVGs) no lugar de fotografias, para não depender de bancos de imagem genéricos. Antes de publicar:

1. Substitua os elementos `.galeria__swatch`, `.member-card__photo`, `.ambiente__frame`, `.compare__before/.compare__after` e `.sobre__frame` por fotografias reais em WebP.
2. Adicione `loading="lazy"` (já presente onde aplicável) e defina `width`/`height` explícitos em cada `<img>` para evitar layout shift.
3. Gere um `og-cover.jpg` (1200×630) real em `assets/img/` para as meta tags Open Graph/Twitter.
4. Exporte um `apple-touch-icon.png` (180×180) a partir de `assets/logo/logo.svg`.

## SEO

- Um único `<h1>` na Hero; hierarquia de headings respeitada em toda a página.
- JSON-LD: `HairSalon`/`LocalBusiness`, `Organization`, `BreadcrumbList`, `FAQPage` e `Review`/`AggregateRating`.
- Meta tags completas: description, canonical, Open Graph, Twitter Cards.
- `robots.txt` e `sitemap.xml` prontos para produção (ajustar domínio antes do deploy).

## Performance

- Fontes carregadas com `preconnect` + `font-display: swap`.
- CSS crítico único e enxuto, sem frameworks.
- JavaScript modular, carregado com `defer`.
- Mapa em `<iframe loading="lazy">`.
- Estrutura pronta para lazy loading de imagens reais e compressão WebP.

## Acessibilidade

- HTML semântico (`header`, `main`, `section`, `footer`, `nav`, `dl`).
- Skip link para o conteúdo principal.
- Estados de foco visíveis (`:focus-visible`).
- Contraste testado sobre o fundo escuro.
- Navegação completa por teclado, incluindo menu mobile, accordion do FAQ e lightbox da galeria.
- `prefers-reduced-motion` respeitado globalmente.

