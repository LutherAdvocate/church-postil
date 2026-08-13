<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: '' },
  source: { type: String, default: '' }
})

const route = useRoute()

// Using computed ensures it updates if route.path changes
const sourceVolume = computed(() => {
  let lenkerVol

  if (route.path.startsWith('/da')) return
  else {
    let postil = props.title.split(' ')[0]
    if (postil === 'Trinity') {
      const oneOrTwo = props.title.split(' ')[1]
      postil += ' ' + oneOrTwo
    }
    switch (postil) {
      case 'Advent':
        return lenkerVol = '- Epistles (vol 7) & \n- Gospels (vol 10)'
      case 'Christmas':
        return lenkerVol = '- Epistles (vol 7 & 8) & \n- Gospels (vol 10 & 11)' // 8 & 11 = Epiphany
      case 'Lent':
        return lenkerVol = '- Epistles (vol 8) & \n Gospels (vol 11)'
      case 'Easter':
        return lenkerVol = '- Epistles (vol 8 & 9) & \n- Gospels (vol 11 & 12)' // 9 & 12 = Trinitatis
      case 'Trinity I':
        return lenkerVol = '- Epistles (vol 9) & \n- Gospels (vol 13)' // 1-12 Sunday after Trinitatis
      case 'Trinity II':
        return lenkerVol = '- Epistles (vol 9) & \n- Gospels (vol 14)'
      default:
        return lenkerVol = '- Error in Title -> Unknown volume of Lenker\'s work!'
    }
  }
  // https://share.google/aimode/p0aviyRrIPS1Ouwdp
  return lenkerVol
})

const lenkerVolume = useSourceVolume()
lenkerVolume.value = sourceVolume.value

const showSourceInfo = computed(() => {
  if (route.path.endsWith('-postil')) return false
  else if (route.path.includes('/da/notes')) return false
  else if (route.path.includes('/uddrag')) return false
  else if (props.source !== undefined) return true
  else return true
})
</script>

<template>
  <UAlert
    v-if="route.path.startsWith('/en')"
    title="Translated by J. N. Lenker (1903)"
    :description="`${sourceVolume}`"
    color="neutral"
    variant="outline"
    :actions="[
      {
        label: 'Check Source',
        to: props.source,
        target: '_blank'
      }
    ]"
    class="my-6"
  />
  <UAlert
    v-if="route.path.startsWith('/da') && showSourceInfo"
    title="Kilde"
    description="Translated by Finn B.Andersen"
    color="neutral"
    variant="outline"
    :actions="[
      {
        label: 'www.lutherdansk.dk',
        to: props.source,
        target: '_blank'
      }
    ]"
    class="my-6"
  />
</template>
