<script setup lang="ts">
// https://gemini.google.com/share/940e5681a213
import LZString from 'lz-string'

const route = useRoute()

const props = defineProps<{
  title: string
  description: string
  headline?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  zip?: any
}>()

// 1. Single central decompression container with detailed error logging
const unpackedData = computed(() => {
  // const directZ = props.z || route.query.z
const directZ = props.zip || route.params.zip
  
  // Strict Safety Check: If it's missing, or not a string, exit immediately 
  // to prevent a 500 build worker crash!
  if (!directZ || typeof directZ !== 'string' || directZ.trim() === '') {
    console.log('[OgImage Build Log] No valid payload string present. Skipping decompression.')
    return null
  }

  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(directZ as string)
    
    if (!decompressed) {
      console.error('[OgImage Error] Decompression returned an empty string. The "z" token might be corrupted or cut off. Raw token length:', directZ.length)
      return null
    }

    const parsed = JSON.parse(decompressed)
    console.log('[OgImage Debug] Successfully unpacked payload data object:', parsed)
    return parsed

  } catch (error) {
    console.error('[OgImage Error] Unpack failed during processing cycle.')
    console.error('- Raw "z" string payload:', directZ)
    console.error('- Native Parser Error message:', error)
    return null
  }
})

// 2. Clear, lightweight text bindings that read the log container safely
const h = computed(() => {
  return unpackedData.value?.h || props.headline || 'Luther\'s Church Postil'
})

const t = computed(() => {
  return unpackedData.value?.t || props.title || 'Luther\'s Best Book'
})

const d = computed(() => {
  return unpackedData.value?.d || props.description || 'Now available on net in the best web app ever!'
})

// console.log('--- ISLAND RENDER SUCCESS (Docs) ---')
// console.log('Props (d): ', props.d, '\n- Expand the log if necessary!')

const sectionId = 0
</script>

<template>
  <!-- <div class="w-full h-full flex flex-col justify-center bg-[#020420] relative overflow-hidden"> -->
  <div class="w-[1200px] h-[630px] flex flex-col justify-center px-20 bg-[#020420] relative overflow-hidden">
    <!-- THIE LIGHT SHINING FROM THE UPPER RIGHT CORNER -->

    <!--
    First svg file 
     -->
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
      <!--
      Second svg file
      -->
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
      <!--
      Third svg file
      -->
    </div>

    <div class="pl-[100px] relative z-10">
      <p
        class="uppercase text-[24px] text-[#00DC82] mb-2 font-semibold"
      >
        {{ h }}
      </p>
      <h1
        class="ml-5 text-[32px] mb-6 text-white"

      >
        <!-- text-[50px] font-bold mb-8 -->
        {{ t }}
      </h1>

      <p
        class="text-[32px] text-[#E4E4E7] ml-[80px] border-l-4 border-[#00DC82] pl-[12px] leading-tight max-w-[600px]"
      >
        {{ d }}
      </p>
    </div>
  </div>
</template>
