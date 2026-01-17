import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'r-onboarding',
  description: 'A fully-typed, customizable onboarding component for React',
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=JetBrains+Mono&display=swap', rel: 'stylesheet' }]
  ],
  themeConfig: {
    logo: {
      light: '/logo-light.png',
      dark: '/logo-dark.png'
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/steps' },
      { text: 'Examples', link: '/examples/basic-tour' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        },
        {
          text: 'Essentials',
          items: [
            { text: 'Basic Usage', link: '/guide/basic-usage' },
            { text: 'Customization', link: '/guide/customization' },
            { text: 'Custom Slots', link: '/guide/custom-slots' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Steps', link: '/api/steps' },
            { text: 'Options', link: '/api/options' },
            { text: 'Hooks', link: '/api/hooks' },
            { text: 'Events', link: '/api/events' },
            { text: 'Render Props', link: '/api/render-props' },
            { text: 'CSS Variables', link: '/api/css-variables' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Tour', link: '/examples/basic-tour' },
            { text: 'Custom UI', link: '/examples/custom-ui' },
            { text: 'Theming', link: '/examples/theming' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/fatihsolhan/r-onboarding' },
      { icon: 'x', link: 'https://twitter.com/fatihsolhann' }
    ],
    editLink: {
      pattern: 'https://github.com/fatihsolhan/r-onboarding/edit/main/docs/:path'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2022-present Fatih Solhan'
    }
  }
})
