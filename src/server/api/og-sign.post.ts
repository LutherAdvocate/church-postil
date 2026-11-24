// src/server/api/og-sign.post.ts
/*
This file is not necessary in og-image v6.8, because it is not introduced before in v7


import { defineEventHandler, readBody } from 'nuxt/server'
import { getOgImageUrl } from '#og-image/server'

interface OgSignBody {
  path?: string
  component: string
  width: number
  height: number
  zip?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>
}

export default defineEventHandler(async (event) => {
  const body = await readBody<OgSignBody>(event)

  const url = await getOgImageUrl(event, body.path || '/', {
    component: body.component,
    width: body.width,
    height: body.height,
    props: {
      ...(body.props || {}),
      ...(body.zip ? { zip: body.zip } : {}),
    },
  })

  return { url }
})
*/
