// server/api/og-sign.post.ts
import { getOgImageUrl } from '#og-image/server'

export default defineEventHandler(async (event) => {
  const { component, zip, width, height, path } = await readBody(event)
  const url = getOgImageUrl(event, path || '/', {
    component,
    width,
    height,
    props: { zip },
  })
  return { url }
})
