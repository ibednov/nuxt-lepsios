# nuxt-lepsios contribution guide

## Shared components and variants

This repository is the shared UI layer for multiple products. Every component added here must be reusable across consuming applications.

- Add reusable primitives to the existing component family under `app/components/ui` or `app/components/shared/ui`.
- Before creating a component, search the layer for an existing primitive that can be extended with a prop or variant.
- Product-specific visual treatments are variants of shared components, never a new product namespace or a `waify/` folder. For example, add a named `cosy` variant to the existing Button/Card/Header API when that treatment is reusable.
- Keep variant definitions in the component's existing `variants.ts`/CVA module and expose typed props through the existing component API.
- Do not duplicate Button, Card, Input, Header, Drawer, Calendar, mascot, or token implementations in a consuming app.
- Product pages own domain wiring, copy, and product-specific assets (including mascot image maps); this layer owns reusable structure, interaction, tokens, and visual variants.
- Use Tailwind classes and the existing layer styles. Do not add page-level CSS or one-off global plugins for a single consumer.
- Never hardcode user-facing English/Russian (or other natural-language) copy in `.vue`/`.ts` component code. Text such as titles, labels, buttons, placeholders, errors and aria-labels belongs in the consuming app's i18n JSON. Code identifiers, types and API keys are not UI copy and remain normal source code.
- Consuming applications own navigation policy. Use their centralized route helper (Waify uses `GoToPage`/`GoToBack`) from pages and components; do not introduce direct `navigateTo`, `router.push`, or `router.replace` calls into shared UI components.
- Before changing a shared component, inspect every consuming app that imports it and verify its light and dark theme behavior. Do not put product-specific colors or assumptions into shared defaults; expose an optional prop or variant and configure the product in the consuming app. For dialogs and drawers, verify that both desktop (`Dialog`) and mobile (`Drawer`) surfaces are opaque, readable, and visually isolated from the page behind them.

Before finishing a change, verify that a consuming app can use the new variant through the normal shared component import and that existing variants remain unchanged.
