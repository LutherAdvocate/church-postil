// useDoubleTap.ts

export function useDoubleTap(delay = 300) {
  const lastTapTime = ref(0)
  const lastTapPosition = ref({ x: 0, y: 0 })

  const checkDoubleTap = (event: UIEvent): boolean => {
    const currentTime = Date.now()
    // const timeStamp = useTimeStamp()

    // Get current coordinates
    let curX = 0, curY = 0
    if ('touches' in event) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const touch = (event as TouchEvent).changedTouches[0] as any
      curX = touch.clientX
      curY = touch.clientY
    } else {
      curX = (event as MouseEvent).clientX
      curY = (event as MouseEvent).clientY
    }

    // Calculate distance between taps (prevents accidental double-taps while scrolling)
    const tapDiff = currentTime - lastTapTime.value
    // console.log('lastTapTime = ', lastTapTime.value)
    const dist = Math.sqrt(
      Math.pow(curX - lastTapPosition.value.x, 2)
      + Math.pow(curY - lastTapPosition.value.y, 2)
    )

    // THE LOGIC:
    // - detail === 2 (Reliable on PC)
    // - tapDiff < delay (Reliable on Mobile if distance is small)
    // To this (Adding a minimum 50ms requirement):
    const isDouble = (event.detail === 2) || (tapDiff > 50 && tapDiff < delay && dist < 30)

    if (isDouble) {
      // timeStamp.value = Date.now() // event.timeStamp
      // console.log('Double Click registered, Date.now() = ', timeStamp.value) // event.timeStamp
      lastTapTime.value = 0 // Reset to prevent triple-tap firing twice
      return true
    }

    lastTapTime.value = currentTime
    lastTapPosition.value = { x: curX, y: curY }
    return false
  }

  const reset = () => {
    lastTapTime.value = 0
  }

  return { checkDoubleTap, reset }
}
