# nuxt-lepsios

Shared Nuxt 4 UI layer (shadcn-vue + tokens).

## Variants

- Default (Wishimi): rounded, brand tokens
- `term` / `term-chip` (site / macOS window): IBM-mono chrome, `--lepsios-term-*`
- **Landing palette** (opt-in): dark ink/paper marketing look, `--gp-*`

Button: `variant="term"` | `variant="term-chip"`  
Badge: `variant="term"`  
Toggle: `variant="pill"` | `variant="term"`

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
NUXT_LEPSIOS=../nuxt-lepsios

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
