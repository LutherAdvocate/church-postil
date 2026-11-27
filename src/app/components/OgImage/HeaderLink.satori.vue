<script setup lang="ts">
const props = defineProps<{
  headline?: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="w-[1200px] h-[630px] flex flex-col justify-center px-16 bg-[#020420] relative overflow-hidden">
    <!-- Upper-right sunburst -->
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
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40.5" result="effect1_foregroundBlur_199_94966" />
        </filter>
      </defs>
    </svg>

    <!-- Cross watermark -->
    <div class="absolute -right-6 top-10 opacity-[0.07] text-[#00DC82]">
      <svg width="480" height="600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 2h2v5h5v2h-5v13h-2V9H6V7h5V2z" />
      </svg>
    </div>

    <!-- Centered content -->
    <div class="relative z-10 flex flex-col items-center text-center">
      <p class="uppercase text-[34px] text-[#00DC82] mb-4 font-bold">
        {{ props.headline || "Luther's Church Postil" }}
      </p>

      <h1 class="text-[58px] font-bold leading-tight mb-10 text-white max-w-[1000px]">
        {{ props.title }}
      </h1>

      <div class="border-l-4 border-[#00DC82] pl-6 py-2">
        <p class="text-[38px] font-semibold text-[#00DC82]">
          {{ props.description || 'Tap to jump to this section →' }}
        </p>
      </div>
    </div>
  </div>
</template>
