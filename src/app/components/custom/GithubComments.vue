<!-- components/GithubComments.vue -->
<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useOnline } from '@vueuse/core'

const online = useOnline().value

const time2load = ref(false)
const timer = setTimeout(() => {
  time2load.value = true
  clearTimeout(timer)
}, 1000)
</script>

<template>
  <span
    v-if="online"
    class="relative"
  >
    <!-- CHANGE THE FOLLOWING DATA ON https://giscus.app/ -->
    <Giscus
      repo="LawyerKyrie/church-postil"
      repo-id="R_kgDOQo1rhg"
      category="Comments"
      category-id="DIC_kwDOQo1rhs4Czz1G"
      mapping="url"
      strict="1"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      theme="noborder_dark"
      lang="en"
      crossorigin="anonymous"
      async
    />
  <!-- <ConfirmCookies v-if="time2load" /> -->
  </span>
</template>
