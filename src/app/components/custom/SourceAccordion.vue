<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
// import { useSourceVolume } from '../../composables/states'

const props = defineProps({
  title: { type: String, default: '' },
  source: { type: String, default: '' }
})

const route = useRoute()

const showSourceInfo = computed(() => {
  if (route.path.startsWith('/en')) return true
  else if (route.path.endsWith('-postil')) return false
  else if (route.path.includes('/da/notes')) return false
  else if (route.path.includes('/uddrag')) return false
  else if (props.source !== undefined) return true
  else return true
})

// Using computed ensures it updates if route.path changes
const sourceObj = computed(() => {
  let postilRef, volumeRef, urlRef, differences

  if (route.path.startsWith('/da')) return // if (locale.value !== 'en') return
  else {
    let postil = props.title.split(' ')[0]
    if (postil === 'Trinity') {
      const oneOrTwo = props.title.split(' ')[1]
      postil += ' ' + oneOrTwo
    }
    switch (postil) {
      case 'Advent':
        postilRef = '[7 & 10](https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr07luth+OR+precioussacredwr10luth&sort=publicdate){:target="_blank" title="Link to this two volumes on archive.org"}'
        volumeRef = '- Epistles (vol 7) & \n- Gospels (vol 10)'
        urlRef = 'https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr07luth+OR+precioussacredwr10luth&sort=publicdate'
        differences = ''
        break
      case 'Christmas':
        postilRef = '[7, 8, 10 & 11](https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr07luth+OR+precioussacredwr11luth+OR+precioussacredwr10luth+OR+precioussacredwr11luth&sort=publicdate){:target="_blank" title="Link to this four volumes on archive.org"}' // 8 & 11 = Epiphany
        volumeRef = '- Epistles (vol 7 & 8) & \n- Gospels (vol 10 & 11)' // 8 & 11 = Epiphany
        urlRef = 'https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr07luth+OR+precioussacredwr11luth+OR+precioussacredwr10luth+OR+precioussacredwr11luth&sort=publicdate'
        differences = '- The original Christmas (& Advent) postil of 1521/22 was in 1544 part of the Winter Postil'
        break
      case 'Lent':
        postilRef = '[8 & 11](https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr08luth+OR+precioussacredwr11luth&sort=publicdate){:target="_blank" title="Link to this two volumes on archive.org"}'
        volumeRef = '- Epistles (vol 8) & \n Gospels (vol 11)'
        urlRef = 'https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr08luth+OR+precioussacredwr11luth&sort=publicdate'
        differences = '- In the 1543/44 version of the Church Postil this postil and (the previous two postil\'s) was part of the winter postil.'
        break
      case 'Easter':
        postilRef = '[8, 9, 11 & 12](https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr08luth+OR+precioussacredwr09luth+OR+precioussacredwr11luth+OR+precioussacredwr12luth&sort=publicdate){:target="_blank" title="Link to this four volumes on archive.org"}' // 9 & 12 = Trinitatis
        volumeRef = '- Epistles (vol 8 & 9) & \n- Gospels (vol 11 & 12)' // 9 & 12 = Trinitatis
        urlRef = 'https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr08luth+OR+precioussacredwr09luth+OR+precioussacredwr11luth+OR+precioussacredwr12luth&sort=publicdate'
        differences = '- Original "easter" postil starts on the first day of easter (1.part of the Summer Postil)'
        break
      case 'Trinity I':
        postilRef = '[9 & 13](https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr09luth+OR+precioussacredwr13luth&sort=publicdate){:target="_blank" title="Link to this two volumes on archive.org"}' // 1-12 Sunday after Trinitatis
        volumeRef = '- Epistles (vol 9) & \n- Gospels (vol 13)' // 1-12 Sunday after Trinitatis
        urlRef = 'https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr09luth+OR+precioussacredwr13luth&sort=publicdate'
        differences = '- This postil was originally part of the Summer Postil (1526/27)'
        break
      case 'Trinity II':
        postilRef = '[9 & 14](https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr09luth+OR+precioussacredwr14luth&sort=publicdate){:target="_blank" title="Link to this two volumes on archive.org"}'
        volumeRef = '- Epistles (vol 9) & \n- Gospels (vol 14)'
        urlRef = 'https://archive.org/details/Wellesley_College_Library?tab=collection&query=precioussacredwr09luth+OR+precioussacredwr14luth&sort=publicdate'
        differences = '- - The sermon on all saint\'s (included here) was originally from the Festival Postil (1526/27)'
        break
      default:
        postilRef = '[Error](http://bad-url-ref.com){:target="_blank" title="Error - No volumes is detected!"} in Title - Unknown Postil!'
        volumeRef = '- Error in Title - Unknown volume of Lenker\'s work!'
        urlRef = 'http://bad-url-ref.com'
        differences = ''
        break
    }
  }
  // https://share.google/aimode/p0aviyRrIPS1Ouwdp
  return { postilRef, volumeRef, urlRef, differences }
})

useHead({
  link: computed(() => {
    if (props.source === undefined) return []

    return [{
      rel: 'canonical',
      href: sourceObj.value?.urlRef === undefined ? props.source : sourceObj.value?.urlRef
    }]
  })
})

/* ------- CREDIT AND SOURCES --------- */
const sourceAccordion: AccordionItem[] = [
  {
    label: 'Source & Publication History',
    icon: 'i-wordpress-comment-author-name'
  }
]

const getPostil = () => {
  const pathArray = route.path.split('/')

  const postil = pathArray[2]
  switch (postil) {
    case 'advent':
      return 'Advent Postil'
    case 'christmas':
      return 'Jule Postil'
    case 'lent':
      return 'Faste Postil'
    case 'easter':
      return 'Påske Postil'
    case 'trinity1':
      return 'Trefoldighed I'
    case 'trinity2':
      return 'Trefoldighed II'
    default:
      return 'Error'
  }
}

const daItems = [
  {
    label: 'Digital kilde referanse',
    icon: 'i-lucide-library',
    class: '',
    content: '&nbsp;'
      + 'Digitalisert/ oversatt av _Finn B.Andersen_.\n'
      + '- **Digital kilde:** [www.lutherdansk.dk]('
      + props.source
      + '){:target="_blank" title="Den danske kirkepostille er hentet fra Finn B.Andersens site; www.lutherdansk.dk"}\n'
  },
  {
    label: 'Historisk info - Kirke Postil',
    icon: 'i-lucide-church',
    class: '',
    content: '&nbsp;'
      + '**Original værk:**\n'
      + '- _Luther\'s Kirke Postil_ (1544)\n'
      + '- **Postil?** Denne prædiken er del av '
      + '**' + getPostil() + '**'
  },
  {
    label: 'Optimalisert for mobil',
    icon: 'i-circum-mobile-4',
    class: '',
    content: '&nbsp;'
      + 'Optimized for studies on mobile.\n'
      + 'Read more:\n'
      + '- [Create note or highlight text etc.](../da/notes){:target="_blank" title="Click to read about how to create notes etc."}\n'
  }
]// https://share.google/aimode/p0aviyRrIPS1Ouwdp

const sourceVolume = useSourceVolume()

const enItems = [
  {
    label: 'Translation - Lenker Reference',
    icon: 'i-entypo-creative-commons-public-domain',
    class: '',
    content: '&nbsp;'
      + 'This version of the postil was **translated by J.N. Lenker D.D.** (1903)\n'
      + '- Source of postil sermons is vol. '
      + sourceObj.value?.postilRef
      + ' of Lenker\'s multivolume work: _The Precious and Sacred Writings of Martin Luther_ (1903)\n'
      + sourceVolume.value
  },
  {
    label: 'Digital Source - USA Library',
    icon: 'i-lucide-library',
    class: '',
    content: '&nbsp;'
      + 'Digitized to pdf/txt etc. by _Wellesley College Library_.\n'
      + '- **Digital Source:** [Wellesley College Library]('
      + sourceObj.value?.urlRef
      + '){:target="_blank" title="The volumes of Lenker\'s Church Postil at archive.org (that contains the original text of this page)"} (archive.org)\n'
      + '- Part of this Library\'s [Collection on Internet Archive](https://archive.org/details/Wellesley_College_Library?tab=collection&query=Lenker&sort=publicdate){:target="_blank" title="The eight (8) volumes of Lenker\'s Church Postil at archive.org"}.\n'
      + '- Wellesley College Library is part of the [The Boston Library Consortium](https://archive.org/details/blc?tab=collection&query=Wellesley){:target="_blank" title="The Boston Library Consortium (on Internet Archive)"}'
  },
  {
    label: 'Historical info - Church Postil',
    icon: 'i-lucide-church',
    class: '',
    content: '&nbsp;'
      + '**Original Work:**\n'
      + '- _Luther\'s Church Postil_ (1544)\n'
      + '- **Postil?** The sermons on this page belongs to the '
      + '**' + props.title + '**\n'
      + sourceObj.value?.differences
  },
  {
    label: 'Optimized for mobile etc.',
    icon: 'i-circum-mobile-4',
    class: '',
    content: '&nbsp;'
      + 'Optimized for studies on mobile.\n'
      + 'Read more:\n'
      + '- [Create note or highlight text etc.](../da/notes){:target="_blank" title="Click to read about how to create notes etc."}\n'
  }
]
// https://share.google/aimode/p0aviyRrIPS1Ouwdp

const activeSourceAccordion = ref()
</script>

<template>
  <UAccordion
    v-if="showSourceInfo"
    v-model="activeSourceAccordion"
    :items="sourceAccordion"
  >
    <template #content>
      <!-- <p class="pb-3.5 text-sm text-muted"></p> -->
      <UAccordion
        type="single"
        :items="route.path.startsWith('/en') ? enItems : daItems"
        :unmount-on-hide="false"
        :default-value="['0']"
        class="pl-4"
        :ui="{
          trigger: 'text-base',
          body: 'text-base text-muted'
        }"
      >
        <template #body="{ item }">
          <MDC
            :value="item.content"
            unwrap="p"
          />
        </template>
      </UAccordion>
    </template>
  </UAccordion>
</template>
