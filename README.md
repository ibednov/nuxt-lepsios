# nuxt-lepsios

Shared Nuxt 4 UI layer (shadcn-vue + tokens).

## Variants

- Default (Wishimi): rounded, brand tokens
- `term` / `term-chip` (site / macOS window): IBM-mono chrome, `--lepsios-term-*`

Button: `variant="term"` | `variant="term-chip"`  
Badge: `variant="term"`  
Toggle: `variant="pill"` | `variant="term"`

## macOS window

`SharedUiMacosWindow` + `useTermWindow({ onClose })` + `term.css`.

## Consume

```ts
extends: [process.env.NUXT_LEPSIOS]
alias: { '~/lib': '#layers/lepsios/app/lib' }
```
