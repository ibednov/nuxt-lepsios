import * as VueTheMaskModule from 'vue-the-mask'

/** vue-the-mask is CJS/UMD — Vite ESM has no stable named default */
function resolveVueTheMask() {
  const mod = VueTheMaskModule as {
    default?: { default?: unknown } | unknown
  }
  const outer = mod.default ?? mod
  if (outer && typeof outer === 'object' && 'default' in outer && (outer as { default: unknown }).default) {
    return (outer as { default: unknown }).default
  }
  return outer
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(resolveVueTheMask() as Parameters<typeof nuxtApp.vueApp.use>[0])
})
