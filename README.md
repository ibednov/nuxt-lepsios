# nuxt-lepsios

Shared Nuxt 4 UI layer (shadcn-vue + tokens).

## Variants

- Default (Wishimi): rounded, brand tokens
- `term` / `term-chip` (site / macOS window): IBM-mono chrome, `--lepsios-term-*`
- **Landing palette** (opt-in): dark ink/paper marketing look, `--gp-*`

Button: `variant="term"` | `variant="term-chip"`  
Badge: `variant="term"`  
Toggle: `variant="pill"` | `variant="term"`

Warm product variants are shared primitives too: use `variant="cosy"` on Button, Card, Badge, Input and `SharedUiEmpty`. The consuming product may opt into `app/assets/css/cosy.css`; product-specific assets and their mapping components stay in the consuming product.

## Admin UI kit

Admin presentation primitives live in [`@lepsios/vue`](https://github.com/ibednov/vue-lepsios) as `AdminShell`, `AdminPage`, `AdminPageHeader`, `AdminMetricGrid`, `AdminDataTable` / `AdminDataGrid`, `AdminEmptyState`, `AdminFormDrawer`, `AdminRowActions`.

Nuxt products depend on `@lepsios/vue` themselves (this layer must not import it). Keep Nuxt auto-import names with thin product wrappers if needed, e.g. `SharedUiAdminShell` → `AdminShell`.

## macOS window

`SharedUiMacosWindow` + `useTermWindow({ onClose })` + `term.css`.

## Landing palette (opt-in)

Не подключается автоматически через `css: []` слоя — чтобы Wishimi и другие приложения не перекрашивались.

**Только цвета / утилиты:**

```css
@import "tailwindcss";
@import "#layers/lepsios/app/assets/css/landing.css";
```

Даёт: `--gp-paper`, `--gp-ink`, `--gp-accent`, glow/type/reveal утилиты, `.landing-wide-container`.

**Палитра + примитивы:**

| Компонент / API | Назначение |
|---|---|
| `useScrollReveal(target)` | IntersectionObserver reveal |
| `SharedUiRotatingText` | смена фраз (`phrases`, `paused`) |
| `SharedUiGlowCard` | карточка со свечением (`glow`, `media`) |
| `SharedUiFaqDetails` | FAQ на native `details` (`items`) |

```vue
<SharedUiRotatingText :phrases="['platforms', 'cabinets']" />
<SharedUiGlowCard glow="violet" media="bars">…</SharedUiGlowCard>
<SharedUiFaqDetails :items="[{ question: '…', answer: '…' }]" />
```

## Consume

```ts
extends: [process.env.NUXT_LEPSIOS]
alias: { '~/lib': '#layers/lepsios/app/lib' }
```

```bash
# local
NUXT_LEPSIOS=../../_shared/nuxt-lepsios

# remote
NUXT_LEPSIOS=github:ibednov/nuxt-lepsios#master
```

## Landing brutal (light, opt-in)

Master-style light ink/paper palette:

```css
@import "#layers/lepsios/app/assets/css/landing-brutal.css";
```

Dark marketing palette remains in `landing.css`.

## Landing shared blocks

| Component | Props |
|---|---|
| `SharedUiBrowserWindow` | `os: 'macos'\|'windows'`, `url`, `expanded`; slots `tabs`, `url`, default |
| `SharedUiBrutalChip` | `icon`, `label` |
| `SharedUiBrutalCard` | `color: 'white'\|'dark'`, `active`, `index`, `tag`, `title`, `subtitle`, `description`, `items` |
| `SharedUiTagCloud` | `items[{id,label,description?}]`, `moreLabel` |
| `SharedUiFaqDetails` | `items`, `color`, `numbered` |

## Audio notifications

Shared UI alert WAVs live in the layer (MIT, royalty-free). Do **not** copy them into product apps.

| Path | Content |
|---|---|
| `app/assets/audio/audio-notifications/positive/` | success / milestone / start alerts |
| `app/assets/audio/audio-notifications/negative/` | error / drop / timeout alerts |
| `app/assets/audio/audio-notifications/LICENSE` | MIT |
| `app/assets/audio/audio-notifications/README.MD` | per-file acoustic notes |

**Import from a consuming Nuxt app** (layer name `lepsios`):

```ts
import alertUrl from '#layers/lepsios/app/assets/audio/audio-notifications/positive/cardioPulse_alert.wav'

const audio = new Audio(alertUrl)
await audio.play()
```

Examples:

- positive: `boxingBell_alert.wav`, `cardioPulse_alert.wav`, `zenGong_alert.wav`, …
- negative: `negative_buzzerError_alert.wav`, `negative_flatline_alert.wav`, …

Wishimi chat message alert uses `positive/cardioPulse_alert.wav`.

## Content helpers

| API | Notes |
|---|---|
| `useMarkdown()` | markdown-it + shiki (github light/dark) |
| `utils/date` | dayjs helpers (`formatDate`, `formatDateOnlyBasedOnLocale`, …) |
| `SharedUiToc` + `SharedUiTocItem` | TOC drawer from `body.toc.links` |
| `plugins/ssr-width` | `provideSSRWidth(1024)` for SSR breakpoints |

## Package boundary (2026-10)

`nuxt-lepsios` must **not** depend on `@lepsios/vue`. Nuxt apps depend on both packages themselves and alias `~/components/ui` → `@lepsios/vue`.

The duplicated `app/components/ui` tree stays until every consumer stops resolving UI from this layer (`#layers/lepsios/app/components/ui` or shadcn `componentDir` here).

**Ready:** Wishimi front, Waify web, Wishimi CRM → `@lepsios/vue`.

**Blocker before delete:** `alexbednov-work-nest-vue` still aliases UI to this layer and has no `@lepsios/vue` dep (extends `github:ibednov/nuxt-lepsios#master`). Follow-up: add `@lepsios/vue`, point `~/components/ui` at it (or drop the override and use the app-local `app/components/ui` tree), then remove `app/components/ui/**` and the layer `shadcn.componentDir` from this package.
