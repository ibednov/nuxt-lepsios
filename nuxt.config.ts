export default defineNuxtConfig({
  modules: [
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/i18n',
  ],

  colorMode: {
    classSuffix: '',
    fallback: 'dark',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode',
  },

  shadcn: {
    prefix: '',
    componentDir: '~/components/ui',
  },

  i18n: {
    restructureDir: 'app',
    locales: [
      { code: 'en', language: 'en-EN', file: 'en.json', dir: 'ltr' },
      { code: 'ru', language: 'ru-RU', file: 'ru.json', dir: 'ltr' },
    ],
    defaultLocale: 'en',
    langDir: 'lang',
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: false,
  },

  imports: {
    dirs: [
      'composables/**',
      'utils/**',
      'interfaces/**',
    ],
    presets: [
      {
        from: '@vueuse/core',
        imports: [
          'breakpointsTailwind',
          'useBreakpoints',
        ],
      },
    ],
  },

  icon: {
    provider: 'none',
    fallbackToApi: false,
    clientBundle: {
      scan: {
        globInclude: ['**/*.{vue,ts,tsx,jsx,md,mdc,mdx,yml,yaml}'],
        globExclude: ['node_modules', 'dist', 'build', 'coverage', 'test', 'tests', '.*'],
      },
      sizeLimitKb: 512,
    },
    serverBundle: {
      collections: ['lucide'],
    },
  },
  compatibilityDate: '2026-01-11',
})
