<script setup lang="ts">
// Add custom javascript here
</script>

<template>
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="[{
      label: 'Books',
      to: 'https://luther-books-v1.vercel.app/',
      target: '_blank'
    }, {
      label: 'Works',
      to: 'https://luthers-works-v1.vercel.app/',
      target: '_blank'
    }, {
      label: 'Dogma',
      to: 'https://christian-dogmatics.vercel.app/',
      target: '_blank'
    }, {
      label: 'Theme',
      to: 'https://nuxt-docs-ui-theme.vercel.app/',
      target: '_blank'
    }, {
      label: 'Catechism',
      to: 'https://luthers-catechism.vercel.app/',
      target: '_blank'
    }, {
      label: 'Chat',
      to: 'https://chat-template.nuxt.dev/',
      target: '_blank'
    }, {
      label: 'Portfolio',
      to: 'https://portfolio-template.nuxt.dev/',
      target: '_blank'
    }, {
      label: 'Church Postil',
      to: 'https://church-postil.vercel.app/',
      color: 'primary',
      checked: true,
      type: 'checkbox'
    }]"
    :content="{ align: 'start' }"
    :ui="{ content: 'min-w-fit' }"
    size="xs"
  >
    <UButton
      label="More"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      size="xs"
      class="-mb-[6px] font-semibold rounded-full truncate"
      :class="[open && 'bg-primary/15']"
      :ui="{
        trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ')
      }"
    />
  </UDropdownMenu>
</template>
