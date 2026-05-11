# Design System Forest/Lime

## 1. Objetivo e Principios
Este documento formaliza o Design System do projeto para orientar a criacao de componentes reutilizaveis com foco em:
- Reutilizacao entre projetos futuros.
- Consistencia visual e de comportamento.
- Escalabilidade da base de UI.

Contexto macro do projeto: ver [context.md](./context.md).

## 2. Paleta de Cores e Papeis Semanticos

### Forest (monocromatica)
Dois extremos da mesma escala (hue aproximado de 130 graus), com variacao de lightness.

- `forest-900`: `#010E05`
- `forest-800`: `#0B1D10`
- `forest-700`: `#17321C`
- `forest-600`: `#284D2F`
- `forest-500`: `#3D6B45`
- `forest-400`: `#5A8A61`
- `forest-300`: `#7EA98A`
- `forest-200`: `#A5C4AD`
- `forest-100`: `#C8DCCE`
- `forest-50`: `#EAF3ED`

### Lime (accent)
Uso restrito aos 10% visuais: CTAs, highlights, icones de destaque e indicadores ativos.

- `lime-700`: `#2A4500`
- `lime-500`: `#5E880C`
- `lime-400`: `#8DC929`
- `lime-300`: `#B8FF47` (accent principal)
- `lime-200`: `#D4FF8E`
- `lime-100`: `#EFFFD6`

### Tokens semanticos principais
- `--color-surface`: `#EAF3ED` (forest-50)
- `--color-dark`: `#010E05` (forest-900)
- `--color-accent`: `#B8FF47` (lime-300)

## 3. Regra 60/30/10
- `60% Surface (#EAF3ED)`: backgrounds de pagina, cards e paineis.
- `30% Dark (#010E05)`: textos, headers, sidebars, nav bars e secoes de destaque.
- `10% Accent (#B8FF47)`: CTAs, estados ativos, highlights, badges e progress bars.

Exemplo pratico de composicao:
- Fundo principal e containers neutros com `--color-surface`.
- Estruturas de leitura e navegacao com `--color-dark`.
- Acoes principais e feedback visual com `--color-accent`.

## 4. Escala de Spacing (base 8pt)
- `--sp-1: 4px` (micro: separadores e icones)
- `--sp-2: 8px` (xs: gap interno de componente)
- `--sp-3: 16px` (sm: padding de botao e gaps de lista)
- `--sp-4: 24px` (md: padding de card)
- `--sp-5: 32px` (lg: gap entre secoes)
- `--sp-6: 48px` (xl: padding de secao)
- `--sp-7: 64px` (2xl: separacao de blocos)
- `--sp-8: 96px` (3xl: secoes hero)
- `--sp-9: 128px` (4xl: margens de pagina)

## 5. Escala de Border Radius
- `--radius-none: 0px`
- `--radius-xs: 4px`
- `--radius-sm: 8px`
- `--radius-md: 16px`
- `--radius-lg: 24px`
- `--radius-xl: 32px`
- `--radius-full: 9999px`

## 6. Escala Tipografica
- `display`: 48px
- `h1`: 32px
- `h2`: 24px
- `h3`: 20px
- `body`: 16px
- `small`: 14px
- `caption`: 12px

Direcao de uso:
- `display` para destaque hero.
- `h1/h2/h3` para hierarquia de heading.
- `body` para leitura principal.
- `small` para texto secundario e labels.
- `caption` para metadados, tokens e labels tecnicas.

## 7. Variaveis CSS (fonte da verdade)
Bloco oficial de tokens para futura implementacao:

```css
:root {
  --color-surface:    #EAF3ED;   /* forest-50  */
  --color-dark:       #010E05;   /* forest-900 */
  --color-accent:     #B8FF47;   /* lime-300   */

  --forest-50:  #EAF3ED;   --forest-100: #C8DCCE;
  --forest-200: #A5C4AD;   --forest-300: #7EA98A;
  --forest-400: #5A8A61;   --forest-500: #3D6B45;
  --forest-600: #284D2F;   --forest-700: #17321C;
  --forest-800: #0B1D10;   --forest-900: #010E05;

  --lime-100: #EFFFD6;   --lime-200: #D4FF8E;
  --lime-300: #B8FF47;   --lime-400: #8DC929;
  --lime-500: #5E880C;   --lime-700: #2A4500;

  --sp-1: 4px;   --sp-2: 8px;   --sp-3: 16px;
  --sp-4: 24px;  --sp-5: 32px;  --sp-6: 48px;
  --sp-7: 64px;  --sp-8: 96px;  --sp-9: 128px;

  --radius-none: 0px;   --radius-xs: 4px;
  --radius-sm:   8px;   --radius-md: 16px;
  --radius-lg:   24px;  --radius-xl: 32px;
  --radius-full: 9999px;
}
```

## 8. Fontes

### Clash Display (titulos e destaque)
Fonte principal para `display`, `h1`, `h2` e `h3`.

Opcao com `@import`:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
```

Opcao com `<link>` no HTML:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet">
```

Stack recomendada:

```css
font-family: "Clash Display", "DM Sans", Arial, sans-serif;
```

### DM Sans (texto de interface e corpo)
Fonte principal para `body`, `small` e `caption`.

Stack recomendada:

```css
font-family: "DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
```

## 9. Regra de Uso do Accent Lime
- O accent (`--color-accent` / `lime-300`) deve ficar limitado a aproximadamente 10% da interface.
- Priorizar uso em:
  - CTAs primarios.
  - Estados ativos.
  - Highlights de informacao importante.
  - Badges/status e indicadores de progresso.
- Evitar usar accent como fundo dominante de paginas inteiras.

## 10. Checklist de Adocao Futura
- Mapear os tokens em um arquivo CSS global quando iniciar implementacao visual.
- Aplicar tipografia e escala de espacamento em componentes base (Button, Input, Card, Badge, Navbar).
- Validar consistencia da regra 60/30/10 nas principais telas.
- Auditar contraste e acessibilidade apos a primeira rodada de implementacao.
- Revisar o Design System antes de publicar a primeira biblioteca interna de componentes.

## Status desta Etapa
Esta etapa e exclusivamente documental. Nenhuma implementacao foi aplicada aos arquivos de CSS do app nesta fase.
