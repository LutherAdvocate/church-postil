export default defineAppConfig({
  ui: {
    accordion: {
      slots: {
        header: 'px-4'
      }
    },
    commandPalette: {
      slots: {
        input: '[&>input]:[inputmode:none]'
        // input: '[&>input]:focus:ring-0 [&>input]:focus:outline-none h-12'
      },
      // wrapper should NOT have a fixed height here
      // wrapper: 'flex flex-col min-h-0',
      // viewport handles the "growing" until it hits the max-h of the parent
      viewport: 'overflow-y-auto',
      // footer stays at the end of the flex column
      footer: 'sticky bottom-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
      // https://gemini.google.com/share/664d10243a00
      /*
      header: {
        slots: {
          toggle: 'lg:flex'
        }
      },
      */
    },
    contentToc: {
      slots: {
        // Adjust the 'root' class: change top positioning to 'top-0'
        // and potentially remove background effects.
        // sticky top-0 z-10 bg-white dark:bg-gray-900 -mx-4 px-4 sm:px-6 sm:-mx-6 overflow-y-auto max-h-[calc(100vh)]
        root: 'sticky top-0 z-10'
      }
    },
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    },

    buttonGroup: {
      base: 'relative',
      variants: {
        size: {
          xs: '',
          sm: '',
          md: '',
          lg: '',
          xl: ''
        },
        orientation: {
          horizontal: 'inline-flex -space-x-px',
          vertical: 'flex flex-col -space-y-px'
        }
      }
    }

  },
  seo: {
    siteName: 'Church Postil'
  },
  header: {
    slot: { root: 'relative top-auto z-60' },
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true
    // links: [{ /* */ }]

  },
  footer: {
    credits: `@LawyerKyrie • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-discord',
      'to': 'https://go.nuxt.com/discord',
      'target': '_blank',
      'aria-label': 'Nuxt on Discord'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://go.nuxt.com/x',
      'target': '_blank',
      'aria-label': 'Nuxt on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/LawyerKyrie/church-postil/',
      'target': '_blank',
      'aria-label': 'Church Postil on GitHub'
    }]
  },
  toc: {
    title: '', // 'Table of Content '
    bottom: {
      title: 'Community',
      edit: 'https://github.com/LawyerKyrie/church-postil/edit/main/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/LawyerKyrie/church-postil',
        target: '_blank'
      }, {
        icon: 'i-lucide-book-open',
        label: 'Church Postil Docs',
        to: 'https://github.com/LawyerKyrie/church-postil',
        target: '_blank'
      }]
    }
  }
})
