<script setup lang="ts">
// https://gemini.google.com/share/940e5681a213
import LZString from 'lz-string'

const route = useRoute()

const props = defineProps<{
  h?: string
  t?: string
  d?: string
  z?: string
}>()

// const h = computed(() => props.h || 'Missing Headline')
const h = computed(() => {
  // 1. If there is a 'z' in the URL (Direct Image Request),
  // UNPACK IT INTERNALLY. Do not trust the props!
  const directZ = props.z || route.query.z
  if (directZ) {
    try {
      const unpacked = JSON.parse(LZString.decompressFromEncodedURIComponent(directZ as string))
      if (unpacked.h) return unpacked.h
    } catch (e) { console.error('Unzip of s-query failed', e) }
  }

  // 2. Fallback to the prop (which slug.vue handles for the 's' case)
  return props.h || 'og-image headline'
})

const t = computed(() => {
  // 1. If there is a 'z' in the URL (Direct Image Request),
  // UNPACK IT INTERNALLY. Do not trust the props!
  const directZ = props.z || route.query.z
  if (directZ) {
    try {
      const unpacked = JSON.parse(LZString.decompressFromEncodedURIComponent(directZ as string))
      if (unpacked.t) return unpacked.t
    } catch (e) { console.error('Unzip of s-query failed', e) }
  }

  // 2. Fallback to the prop (which slug.vue handles for the 's' case)
  return props.t || 'og-image title'
})

const d = computed(() => {
  // 1. If there is a 'z' in the URL (Direct Image Request),
  // UNPACK IT INTERNALLY. Do not trust the props!
  const directZ = props.z || route.query.z
  if (directZ) {
    try {
      const unpacked = JSON.parse(LZString.decompressFromEncodedURIComponent(directZ as string))
      if (unpacked.d) return unpacked.d
    } catch (e) { console.error('Unzip of s-query failed', e) }
  }

  // 2. Fallback to the prop (which slug.vue handles for the 's' case)
  return props.d || 'og-image description'
})

// console.log('--- ISLAND RENDER SUCCESS (Mobile) ---')
// console.log('Props (d): ', props.d, '\n- Expand the log if necessary!')
</script>

<template>
  <div class="relative w-full h-full bg-[#0f172a] flex flex-col justify-between overflow-hidden">
    <svg
      class="absolute right-0 top-0"
      width="629"
      height="593"
      viewBox="0 0 629 593"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_199_94966)">
        <path
          d="M628.5 -578L639.334 -94.4223L806.598 -548.281L659.827 -87.387L965.396 -462.344L676.925 -74.0787L1087.69 -329.501L688.776 -55.9396L1160.22 -164.149L694.095 -34.9354L1175.13 15.7948L692.306 -13.3422L1130.8 190.83L683.602 6.50012L1032.04 341.989L668.927 22.4412L889.557 452.891L649.872 32.7537L718.78 511.519L628.5 36.32L538.22 511.519L607.128 32.7537L367.443 452.891L588.073 22.4412L224.955 341.989L573.398 6.50012L126.198 190.83L564.694 -13.3422L81.8734 15.7948L562.905 -34.9354L96.7839 -164.149L568.224 -55.9396L169.314 -329.501L580.075 -74.0787L291.604 -462.344L597.173 -87.387L450.402 -548.281L617.666 -94.4223L628.5 -578Z"
          fill="#00DC82"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_199_94966"
          x="0.873535"
          y="-659"
          width="1255.25"
          height="1251.52"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood
            flood-opacity="0"
            result="BackgroundImageFix"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="40.5"
            result="effect1_foregroundBlur_199_94966"
          />
        </filter>
      </defs>
    </svg>

    <div class="absolute -right-22 top-26 opacity-[0.07] text-[#00DC82]">
      <svg
        width="600"
        height="800"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M11 2h2v5h5v2h-5v13h-2V9H6V7h5V2z" />
      </svg>
    </div>

    <div class="relative z-10 flex flex-col p-16 pt-24">
      <p class="text-[#00DC82] uppercase font-bold text-[32px] tracking-wide mb-6">
        {{ h }}
      </p>

      <h1 class="text-white text-[58px] font-black mb-10 leading-[1.1]">
        {{ t }}
      </h1>
      <!-- Place this after {{ t }} inside the h1 tag
        <span v-if="titleParts.length > 1">
          <br>
          {{ titleParts[1] }}
        </span>
        -->

      <p class="break-normal text-slate-300 text-[44px] italic leading-[1.4] border-l-8 border-[#00DC82]/30 pl-8">
        {{ d }}
      </p>
    </div>

    <div class="relative z-10 flex items-center justify-center bg-[#1e293b] py-10 border-t-[6px] border-[#00DC82]">
      <span class="text-[#00DC82] text-[28px] font-mono tracking-[0.2em] uppercase">
        CHURCH-POSTIL.VERCEL.APP
      </span>
    </div>
  </div>
</template>
