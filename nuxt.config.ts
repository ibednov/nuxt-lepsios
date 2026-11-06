export default defineNuxtConfig({
  $meta: { name: 'lepsios' },

  modules: [
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
      // unimport does not expand `export *` from packages; keep explicit names.
      {
        from: '@lepsios/vue',
        imports: [
          'handleErrorFromResponse',
          'sortArray',
          'processFieldsToFieldsData',
          'extractValueFromField',
          'extractDataFromFields',
        ],
      },
    ],
  },

  compatibilityDate: '2026-01-11',

  app: {
    head: {
      meta: [
        { name: 'theme-color', content: '#272727' },
        { name: 'apple-mobile-web-app-status-bar-style', content: '#272727' },
      ],
    },
  },
})
