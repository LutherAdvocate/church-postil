// composables/useOgRouteState.ts
export const useOgRouteState = () => {
  const route = useRoute()
  const { imageData } = useImageState()

  // 1. Set imageData.value.layout from route query parameters
  if (route.query.c === 'Wide' || route.query.c === 'Narrow' || route.query.c === 'QuoteLink') {
    imageData.value.layout = route.query.c
  } else if (route.query.h) {
    imageData.value.layout = 'HeaderLink'
  } else if (route.query.s) {
    imageData.value.layout = 'QuoteLink'
  }

  // 2. Return the strictly typed layout for defineOgImage()
  type OgLayout = Parameters<typeof defineOgImage>[0]

  const layout: OgLayout = (
    imageData.value.layout === 'Wide'
      ? 'Wide'
      : imageData.value.layout === 'Narrow'
        ? 'Narrow'
        : imageData.value.layout === 'HeaderLink'
          ? 'HeaderLink'
          : 'QuoteLink'
  ) as OgLayout

  return layout
}
