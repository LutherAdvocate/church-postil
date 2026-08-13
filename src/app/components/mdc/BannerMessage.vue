<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { $keyboardClickK } = useNuxtApp() as any

const bannerActivated = ref(true) // Control the visibility

const handleActionClick = () => {
  // alert('Action function activated!')
  $keyboardClickK()
  // console.log('Banner actions activated!')
  // isBannerOpen.value = false
}

const actions = ref([
  {
    label: 'Search Menu',
    // variant: 'outline',
    onClick: handleActionClick
  }
])
</script>

<template>
  <UBanner
    v-if="bannerActivated"
    to="#"
    title="“Ctrl k” or Click Opens "
    :actions="actions"
    close
    close-icon="i-lucide-x-circle"
    class="flex justify-center"
    @click="handleActionClick"
  />
</template>
