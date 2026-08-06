// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    'reka-ui/nuxt',
    '@nuxtjs/mcp-toolkit',
    '@vueuse/nuxt'
  ],

  $development: {
    runtimeConfig: {
      // Also tell the site-config module specifically
      site: {
        url: 'http://localhost:3000'
      },
      public: {
        // This forces the .env value to be ignored ONLY during 'pnpm dev'
        siteUrl: 'http://localhost:3000'
      }
    }
  },
  // ssr maybe fixing open page in new tab/ windows
  ssr: true,

  components: [
    { path: '~/components/mdc', pathPrefix: false },
    { path: '~/components/custom', pathPrefix: false },
    '~/components'
  ],

  devtools: {
    enabled: true
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en', // Set your default language here
        dir: 'ltr'
      }
    }
  },

  css: ['~/assets/css/main.css'],

  router: {
    options: {
      scrollBehaviorType: 'smooth'
      // hashMode: false
    }
  },
  site: {
    // 1. Highest Priority: If we are on localhost, use localhost.
    // 2. Second Priority: Use your .env variable (for your old code).
    // 3. Fallback: Your production domain.
    url: import.meta.dev
      ? 'http://localhost:3000'
      : (process.env.NUXT_PUBLIC_SITE_URL || 'https://church-postil.vercel.app')
  },

  content: {
    database: {
      type: 'sqlite',
      // The module creates this file automatically at this path
      filename: '/tmp/content.cache.db'
    },
    experimental: {
      nativeSqlite: true,
      sqliteConnector: 'native'
    },
    build: {
      markdown: {
        toc: {
          depth: 5,
          searchDepth: 1
        }
      }
    }
    // This ensures the database is pre-compiled and read-only
    // cacheQueries: true
  },

  runtimeConfig: {
    public: {
      siteUrl: import.meta.dev
        ? 'http://localhost:3000'
        : (process.env.NUXT_PUBLIC_SITE_URL || 'https://church-postil.vercel.app'),
      apiBase: process.env.NUXT_PUBLIC_API_BASE
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
    }
  },

  routeRules: {
    '/': { prerender: true }, // Good for SEO/Speed on the home page
    '/__og-image__/image/**': {
      ogImage: { renderer: 'satori' } // not 'browser
    },
    '/da/intro': { prerender: true },
    '/da/advent-postil': { prerender: true },
    '/da/christmas-postil': { prerender: true },
    '/da/lent-postil': { prerender: true },
    '/da/easter-postil': { prerender: true },
    '/da/trinity1-postil': { prerender: true },
    '/da/trinity2-postil': { prerender: true },
    '/en/advent': { prerender: true },
    '/en/christmas': { prerender: true },
    '/en/lent': { prerender: true },
    '/en/easter': { prerender: true },
    '/en/trinity1': { prerender: true },
    '/en/trinity2': { prerender: true },
    '/api/**': {
      cache: {
        maxAge: 3600,
        // Ensure the cache varies based on the query string
        varies: ['query']
      }, // 12 hours = 43200
      cors: true
    } // Optional: helps if you ever fetch from other domains
  },
  sourcemap: {
    server: false,
    client: false
  },

  devServer: {
    https: false,
    host: '0.0.0.0'
  },

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    preset: 'vercel',
    timing: true,
    prerender: {
      routes: [
        '/',
        '/en',
        '/da'
      ],
      crawlLinks: true, // required for ssr api call
      autoSubfolderIndex: false,
      concurrency: 1,
      interval: 100
      // failOnError: false
    },
    storage: {
      cache: {
        driver: 'memory' // Or 'fs' if you want it to persist across restarts
      }
    },
    moduleSideEffects: ['lz-string']
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000 // Set the limit to 1000 KiB
    }
  },

  typescript: {
    shim: false,
    strict: false,
    typeCheck: true
  },
  hooks: {
    ready() {
      const apiBase = process.env.NUXT_PUBLIC_API_BASE
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

      console.log('--- SERVER STARTUP AUDIT ---')
      console.log('Final API Base URL:', apiBase)
      console.log('Source: ', process.env.NUXT_PUBLIC_API_BASE ? 'Dashboard' : (process.env.VERCEL_URL ? 'Vercel System' : 'Local Fallback'))
      console.log('-------------------_--------')
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  icon: {
    provider: 'iconify'
  },

  llms: {
    domain: 'https://church-postil.vercel.app/',
    title: 'Church Postil',
    description: 'Luther\'s Church Postil - One year lectionary sermons',
    full: {
      title: 'Luther\'s Church Postil',
      description: 'Luther\'s Church postil in English and Danish Language.'
    },
    sections: [
      {
        title: 'English Postil',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/en%' }
        ]
      },
      {
        title: 'Danish Postil',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/da%' }
        ]
      }
    ]
  },

  mcp: {
    name: 'Church Postil'
  },
  ogImage: {
    // Force the runtime to be active
    enabled: true,
    // This ensures your custom component (e.g. OgImage/Luther.vue)
    // is used when the 'v' parameter is present
    runtimeCacheStorage: true
  }
})

/* // install @vite-pwa/nuxt
  pwa: {
    workbox: {
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 // 1 day
            }
          }
        }
      ]
    }
  }
*/
