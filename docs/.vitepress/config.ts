import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'r-onboarding',
  description: 'A super-slim, fully-typed onboarding component for React',
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }]
  ],
  themeConfig: {
    logo: {
      light: '/logo-light.png',
      dark: '/logo-dark.png'
    },
    nav: [
      { text: 'Guide', link: '/guide/installation' },
      { text: 'Props', link: '/props/steps' },
      { text: 'CSS', link: '/css/z-index' },
      { text: 'Examples', link: '/examples/basic' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Usage', link: '/guide/usage' },
            { text: 'Advanced Usage', link: '/guide/advanced-usage' }
          ]
        }
      ],
      '/props/': [
        {
          text: 'Props',
          items: [
            { text: 'Steps', link: '/props/steps' },
            { text: 'Options', link: '/props/options' },
            { text: 'Render Props', link: '/props/render-props' },
            { text: 'Events', link: '/props/events' }
          ]
        }
      ],
      '/css/': [
        {
          text: 'CSS',
          items: [
            { text: 'z-index', link: '/css/z-index' },
            { text: 'Arrow', link: '/css/arrow' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic', link: '/examples/basic' },
            { text: 'Custom UI', link: '/examples/custom-ui' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/fatihsolhan/r-onboarding' },
      { icon: 'twitter', link: 'https://twitter.com/fatihsolhann' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2022-present'
    }
  }
})
