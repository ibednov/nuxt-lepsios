import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  $meta: { name: 'lepsios' },

  modules: [
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/i18n',
    // Nuxt сам сканит app/components. shadcn-nuxt уже регистрирует ui/* из index.ts.
    // Дополнительный scan ui/index.ts + ui/*.vue → NUXT_B3011.
    // ignore только корневой ui/ (не shared/ui). Без своей components: [].
    function ignoreShadcnUiFromComponentScan(_options, nuxt) {
      nuxt.hook('components:dirs', (dirs) => {
        for (let i = dirs.length - 1; i >= 0; i--) {
          const dir = dirs[i]
          const raw = typeof dir === 'string' ? dir : dir?.path
          const p = String(raw || '').replace(/\\/g, '/')

          // пустой stub от shadcn-nuxt addComponentsDir(ui)
          if (p.endsWith('/components/ui')) {
            dirs.splice(i, 1)
            continue
          }

          // default layer dir: .../app/components
          if (!p.endsWith('/app/components')) {
            continue
          }

          // Только корневой shadcn ui/ — НЕ shared/ui (иначе SharedUi* пропадают).
          const uiIgnore = ['ui/**', 'ui']
          if (typeof dir === 'string') {
            dirs[i] = { path: dir, ignore: uiIgnore }
          }
          else {
            dir.ignore = [...new Set([...(dir.ignore || []), ...uiIgnore])]
          }
        }
      })
    },
  ],

  css: [
    join(currentDir, './app/assets/css/term.css'),
  ],

  colorMode: {
    classSuffix: '',
    fallback: 'dark',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode',
  },

  shadcn: {
    prefix: '',
    componentDir: join(currentDir, './app/components/ui'),
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
