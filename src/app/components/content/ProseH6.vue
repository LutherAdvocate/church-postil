<script setup lang="ts">
// Explicitly define the id prop that Nuxt Content provides
defineProps<{ id: string }>()
</script>

<template>
  <ProseHeaderBase
    :id="id"
    tag="h6"
  >
    <slot />
  </ProseHeaderBase>
</template>
