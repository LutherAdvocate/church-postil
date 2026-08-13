export const useApiUrl = (path: string) => {
  // If we are calling our own /api, Nuxt's $fetch handles it better
  // without the domain on the server.
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  // Try using JUST the relative path first. Nuxt's Nitro engine
  // is usually smart enough to map /api/da to itself without the domain.
  return cleanPath
}

/*
export const useApiUrl = (path: string) => {
  const config = useRuntimeConfig()

  let apiBase = config.public.apiBase // Your default from nuxt.config

  // If we are on the server (SSR) and on Vercel
  if (import.meta.server && process.env.VERCEL_URL) {
    // VERCEL_URL doesn't include 'https://', so we add it
    apiBase = `https://${process.env.VERCEL_URL}`
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`

  // Server needs absolute, Client stays relative
  return import.meta.server ? `${apiBase}${cleanPath}` : cleanPath
}
*/
