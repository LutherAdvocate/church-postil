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

// console.log('--- ISLAND RENDER SUCCESS (Docs) ---')
// console.log('Props (d): ', props.d, '\n- Expand the log if necessary!')

const sectionId = 0
</script>

<template>
  <!-- <div class="w-full h-full flex flex-col justify-center bg-[#020420] relative overflow-hidden"> -->
  <div class="w-[1200px] h-[630px] flex flex-col justify-center px-20 bg-[#020420] relative overflow-hidden">
    <!-- THIE LIGHT SHINING FROM THE UPPER RIGHT CORNER -->
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
    <!-- CROSS ON THE RIGHT SIDE - TEXT ON THE LEFT SIDE -->
    <div class="absolute -right-6 top-10 opacity-[0.07] text-[#00DC82]">
      <svg
        width="480"
        height="600"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M11 2h2v5h5v2h-5v13h-2V9H6V7h5V2z" />
      </svg>
    </div>
    <!--  QR CODE IMAGE -->
    <div class="absolute left-12 bottom-12 z-10">
      <!-- https://www.qrcode-monkey.com/ Foreground Color: #020420 -->
      <svg
        id="Layer_1"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100px"
        height="100px"
        viewBox="0 0 1155 1155"
        enable-background="new 0 0 1155 1155"
        xml:space="preserve"
      >
        <rect
          x="0"
          y="0"
          width="1155"
          height="1155"
          fill="rgb(255,255,255)"
        /><g transform="translate(70,70)"><g transform="translate(280,0) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,0) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,0) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,0) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,0) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,0) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,0) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,35) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,35) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,35) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,35) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,35) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,35) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,35) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,35) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,70) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,70) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,70) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,70) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,70) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,105) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,105) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,105) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,105) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,105) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,105) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,105) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,140) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,140) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,140) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,140) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,140) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,140) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,140) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,175) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,175) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,175) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,175) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,175) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,175) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,210) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,210) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,210) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,210) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,210) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,210) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,210) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,245) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,245) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,245) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,245) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,245) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,245) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,245) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(0,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(70,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(105,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(175,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(210,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(245,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(770,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(875,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(980,280) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(0,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(70,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(105,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(735,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(770,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(980,315) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(35,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(70,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(105,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(140,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(210,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,350) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(70,385) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(245,385) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,385) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,385) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,385) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,385) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,385) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,385) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(735,385) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(980,385) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(0,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(105,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(210,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(245,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(875,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,420) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(35,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(175,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(770,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(980,455) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(35,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(105,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(210,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(245,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(980,490) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(0,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(35,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(70,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(175,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(735,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,525) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(0,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(70,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(105,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(140,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(175,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(210,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(245,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(875,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,560) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(35,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(70,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(105,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(140,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(875,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,595) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(0,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(140,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(175,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(210,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(245,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(770,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,630) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(245,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(735,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,665) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(35,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(175,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(210,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(245,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(735,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(770,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(875,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,700) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(875,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(980,735) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(770,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(875,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,770) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,805) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,805) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,805) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,805) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,805) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,805) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,805) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,805) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(875,805) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(980,805) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(735,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(770,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,840) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(560,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(735,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(875,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(980,875) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(595,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(735,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(910,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(980,910) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(315,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(350,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(420,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(525,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(735,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(875,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,945) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(280,980) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(385,980) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(455,980) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(490,980) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(630,980) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(665,980) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(700,980) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(805,980) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(945,980) scale(0.35,0.35)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(0,0) scale(2.45, 2.45)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <g>
            <rect
              x="15"
              y="15"
              style="fill:none;"
              width="70"
              height="70"
            />
            <path d="M85,0H15H0v15v70v15h15h70h15V85V15V0H85z M85,85H15V15h70V85z" />
          </g>
        </g></g><g transform="translate(770,0) scale(2.45, 2.45)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <g>
            <rect
              x="15"
              y="15"
              style="fill:none;"
              width="70"
              height="70"
            />
            <path d="M85,0H15H0v15v70v15h15h70h15V85V15V0H85z M85,85H15V15h70V85z" />
          </g>
        </g></g><g transform="translate(0,770) scale(2.45, 2.45)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <g>
            <rect
              x="15"
              y="15"
              style="fill:none;"
              width="70"
              height="70"
            />
            <path d="M85,0H15H0v15v70v15h15h70h15V85V15V0H85z M85,85H15V15h70V85z" />
          </g>
        </g></g><g transform="translate(70,70) scale(1.05, 1.05)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(840,70) scale(1.05, 1.05)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g><g transform="translate(70,840) scale(1.05, 1.05)"><g
          transform=""
          style="fill: rgb(2, 4, 32);"
        >
          <rect
            width="100"
            height="100"
          />
        </g></g></g></svg>
    </div>

    <div class="pl-[100px] relative z-10">
      <p
        class="uppercase text-[24px] text-[#00DC82] mb-2 font-semibold"
      >
        {{ h }}
      </p>
      <h1
        class="ml-5 text-[32px] mb-6 text-white"
        :style="{
          opacity: `${sectionId ? 0.6 : 1}`
        }"
      >
        <!-- text-[50px] font-bold mb-8 -->
        {{ t }}
      </h1>

      <p
        class="text-[32px] text-[#E4E4E7] ml-[80px] border-l-4 border-[#00DC82] pl-[12px] leading-tight max-w-[600px]"
      >
        {{ d }}
      </p>

      <!--
      <div
        v-if="sectionId"
        class="flex flex-col gap-3"
      >
        <div
          v-for="(parent, index) in parentList"
          :key="index"
          class="text-[#E4E4E7] leading-tight"
          :style="{
            marginLeft: `${60 + (index * 20)}px`,
            borderLeft: `${Math.max(1, 6 - index)}px solid #00DC82`,
            paddingLeft: '16px',
            fontSize: `${32 - (index * 2)}px`,
            opacity: `${(100 - (index *10)) / 100}`
          }"
        >
          {{ parent }}
        </div>

        <div
          class="mt-2 text-white font-bold leading-tight"
          :style="{
            marginLeft: `${60 + (finalIndex * 20)}px`,
            borderLeft: '2px solid #00DC82',
            paddingLeft: '16px',
            fontSize: '32px',
            maxWidth: '500px'
          }"
        >
          {{ displaySection }}

          <div class="h-1 w-20 bg-[#00DC82] mt-4 opacity-50" />
        </div>
      </div>

      <p
        v-else-if="description"
        class="text-[32px] text-[#E4E4E7] ml-[80px] border-l-4 border-[#00DC82] pl-[12px] leading-tight max-w-[600px]"
      >
        {{ displayDescription }}
      </p>
      -->
    </div>
  </div>
</template>
