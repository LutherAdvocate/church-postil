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
      // 👇 FIX FOR WINDOWS & VERCEL: Uses a local hidden project cache file instead of a broken root /tmp path
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
    /*
    '/__og-image__/image/**': {
      ogImage: { renderer: 'satori' } // not 'browser
    },
    */
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
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        types: ["nuxt", "vite/client"]
      }
    }
  },

  // 👇 THE DEFINTIVE NUXT 4 REFACTOR RESOLUTION
  future: {
    compatibilityVersion: 4 // Activates strict Nuxt 4 layout behavior
  },

  // In Nuxt 4, when compatibilityVersion is 4, you point 'srcDir' directly to your app directory.
  // This automatically sets your pages, components, and composables to standard paths.
  srcDir: 'src/app', 
  
  // Explicitly point the server engine to your custom server directory
  serverDir: 'src/server',

  // 3. 💡 THE ULTIMATE FIX: Tell Nuxt 4 exactly where your content folder lives on your disk.
  // This allows the Content module to find your files without adding 'src/content' prefixes!
  // dir: { public: '../public', }, // Moves up out of src/app to locate src/public

  // Clean components array mapping using Nuxt 4 standard tilde (~) resolution
  components: [
    { path: '~/components/mdc', pathPrefix: false },
    { path: '~/components/custom', pathPrefix: false },
    '~/components'
  ]
  
  // NOTE: 'imports' and 'dir.app' are completely removed. 
  // Nuxt 4 will automatically scan 'src/app/composables' and find your app.config.ts natively!
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
