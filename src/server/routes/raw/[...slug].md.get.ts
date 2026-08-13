import { useI18n } from 'vue-i18n'
import { withLeadingSlash } from 'ufo'
import { stringify } from 'minimark/stringify'
import { queryCollection } from '@nuxt/content/nitro'
import type { Collections } from '@nuxt/content'

export default eventHandler(async (event) => {
  const slug = getRouterParams(event)['slug.md']
  if (!slug?.endsWith('.md')) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: false })
  }

  const { locale } = useI18n()
  const path = withLeadingSlash(slug?.replace('.md', ''))

  const page = await queryCollection(event, 'docs' as keyof Collections).path(`/${locale.value}/${path}`).first()
  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: false })
  }

  // Add title and description to the top of the page if missing
  if (page.body.value[0]?.[0] !== 'h1') {
    page.body.value.unshift(['blockquote', {}, page.description])
    page.body.value.unshift(['h1', {}, page.title])
  }

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  return stringify({ ...page.body, type: 'minimark' }, { format: 'markdown/html' })
})
