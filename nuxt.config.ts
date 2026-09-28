// https://nuxt.com/docs/api/configuration/nuxt-config
// 1. Put this exact code block at the VERY top of your nuxt.config.ts file

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

  // devtools: { enabled: true },

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

  llms: {
    domain: 'https://church-postil.vercel.app/',
    title: 'Luther\'s Church Postil',
    description: 'The study version of Luther\'s Epistles and Sermons in the Church Postil',
  },

  content: {
    database: {
      // Toggle the database adapter type cleanly based on environment
      type: process.env.NODE_ENV === 'production' ? 'sqlite' : 'libsql',
      
      // Pass both keys safely; the inactive driver option will simply be ignored by Nuxt
      filename: '/tmp/content.cache.db',
      url: 'file:.nuxt/content.cache.db'
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
      // 1. Highest Priority: If we are on localhost, use localhost.
      // 2. Second Priority: Use your .env variable (for your old code).
      // 3. Fallback: Your production domain.
      siteUrl: process.env.NODE_ENV === 'development' // import.meta.dev
        ? 'http://localhost:3000'
        : (process.env.NUXT_PUBLIC_SITE_URL || 'https://church-postil.vercel.app'),
      apiBase: process.env.NUXT_PUBLIC_API_BASE
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
    }
  },

  routeRules: {
    // '/': { prerender: true }, // Good for SEO/Speed on the home page
    // '/en/**': { prerender: true },
    // '/da/**': { prerender: true },
/*
    '/__og-image__/image/**': {
      ogImage: { renderer: 'satori' } // not 'browser
    },
*/
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

  ogImage: {
    zeroRuntime: true,
    enabled: true // process.env.NODE_ENV === 'production'
  },

  nitro: {
    preset: 'vercel',
    timing: true,
    storage: {
      cache: {
        driver: 'memory' // Or 'fs' if you want it to persist across restarts
      }
    },
    prerender: {
      crawlLinks: true, // required for ssr api call
      // routes: ['/', '/en', '/da'],
      autoSubfolderIndex: false,
      concurrency: 1,
      interval: 100
      // failOnError: false
    },
    moduleSideEffects: ['lz-string'],
    // experimental: { wasm: true }

  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000 // Set the limit to 1000 KiB
    },
    optimizeDeps: {
      include: ['@tanstack/vue-table', '@tanstack/table-core'],
      exclude: [
        '@nuxtjs/mdc > remark-gfm',
        '@nuxtjs/mdc > remark-emoji',
        '@nuxtjs/mdc > remark-mdc',
        '@nuxtjs/mdc > remark-rehype',
        '@nuxtjs/mdc > rehype-raw',
        '@nuxtjs/mdc > parse5',
        '@nuxtjs/mdc > unist-util-visit',
        '@nuxtjs/mdc > unified',
        '@nuxtjs/mdc > debug',
        '@nuxtjs/mdc > extend'
      ]
    },
    ssr: {
      // Forces Vite to compile unhead code directly into the server bundle file
      noExternal: ['unhead', '@unhead/shared', '@unhead/dom', '@unhead/ssr']
    }
  },
  icon: {
    // provider: 'iconify',
    // fallbackToApi: false, // Prevents it from shouting if it can't find an icon online
    serverBundle: false /*, 
    clientBundle: { 
      scan: true,
      icons: []
    }
    includeCustomCollections: true,
    collections: [ 'lucide',],
    */
  },

  typescript: {
    shim: false,
    strict: false,
    typeCheck: true /*,
    tsConfig: {
      compilerOptions: {
        types: ["nuxt", "vite/client"]
      }
    } */
  },

  future: {
    compatibilityVersion: 4 // Activates strict Nuxt 4 layout behavior
  },

  // This automatically sets my pages, components, and composables to standard paths.
  srcDir: 'src/app', 
  
  // Explicitly point the server engine to your custom server directory
  serverDir: 'src/server',

  // Clean components array mapping using Nuxt 4 standard tilde (~) resolution
  components: [
    { path: '~/components/mdc', pathPrefix: false },
    { path: '~/components/custom', pathPrefix: false },
    '~/components'
  ] // 👈 

}) // 👈 End of defineNuxtConfig

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
