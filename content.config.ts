import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

// const globPattern = /^\/api/

export default defineContentConfig({

  // source: https://share.google/aimode/eylQIis79DQFiR2l2
  collections: {
    // 1. Force the root collection to target the precise file in its new home
    landing: defineCollection({
      type: 'page',
      source: 'index.md' // Back to your original setting!
    }),

    // 2. Point your docs collection down into the new directory structure
    docs: defineCollection({
      type: 'page',
      source: {
        include: '**' // Back to your original setting!
      },
      schema: z.object({
        source: z.string().optional(),
        links: z.array(
          z.object({
            label: z.string(),
            icon: z.string(),
            to: z.string(),
            target: z.string().optional()
          })
        ).optional()
      })
    })
  }

/*
  collections: {
    // 1. Point the landing collection directly to src/content/index.md
    landing: defineCollection({
      type: 'page',
      source: 'src/content/index.md' 
    }),

    // 2. Point your docs collection down into the new directory structure
    docs: defineCollection({
      type: 'page',
      // Update 'include' to point directly inside your src/content directory
      source: {
        include: 'src/content/**'
      },
      schema: z.object({
        // bibletext: z.string().transform(val => val.replace(/\n/g, '<br>')).optional(),
        source: z.string().optional(),
        links: z.array(
          z.object({
            label: z.string(),
            icon: z.string(),
            to: z.string(),
            target: z.string().optional()
          })
        ).optional()
      })
    })
  }

  // hhhhhhhhhhhhhhhhhhhhhhhhhhh
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    docs: defineCollection({
      type: 'page',
      source: {
        include: '**'
      },
      schema: z.object({
        // bibletext: z.string().transform(val => val.replace(/\n/g, '<br>')).optional(),
        source: z.string().optional(),
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional()
      })
    })
  }
  */
})
