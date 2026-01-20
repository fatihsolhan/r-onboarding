import { defineConfig } from 'vitepress'
import pkg from '../../package.json'

const majorVersion = pkg.version.split('.')[0]

export default defineConfig({
  title: 'r-onboarding',
  description: 'A fully-typed, customizable onboarding component for React',

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/props' },
      { text: 'Examples', link: '/examples/basic' },
      {
        text: `v${majorVersion}.x`,
        items: [
          { text: 'Changelog', link: 'https://github.com/fatihsolhan/r-onboarding/releases' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is r-onboarding?', link: '/guide/introduction' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Next.js', link: '/guide/nextjs' }
          ]
        },
        {
          text: 'Essentials',
          items: [
            { text: 'Basic Usage', link: '/guide/basic-usage' },
            { text: 'Customization', link: '/guide/customization' },
            { text: 'Custom UI with Render Props', link: '/guide/custom-slots' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Props', link: '/api/props' },
            { text: 'Steps Configuration', link: '/api/steps' },
            { text: 'Options', link: '/api/options' },
            { text: 'Hooks', link: '/api/hooks' },
            { text: 'Events', link: '/api/events' },
            { text: 'Slots', link: '/api/slots' },
            { text: 'CSS Variables', link: '/api/css-variables' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Tour', link: '/examples/basic' },
            { text: 'Custom UI', link: '/examples/custom-ui' },
            { text: 'Theming', link: '/examples/theming' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fatihsolhan/r-onboarding' },
      { icon: 'x', link: 'https://x.com/fatihsolhann' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Fatih Solhan'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/fatihsolhan/r-onboarding/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
