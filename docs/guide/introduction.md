# What is r-onboarding?

r-onboarding is a fully-typed, customizable onboarding component for React applications.

## Features

- **TypeScript First** - Full type support out of the box
- **Customizable UI** - Use default styling or bring your own with render props
- **Flexible Positioning** - Smart tooltip placement with Popper.js
- **SVG Overlay** - Highlight elements with customizable overlay
- **Lifecycle Hooks** - `onBeforeStep`, `onAfterStep` for custom logic

## When to Use

r-onboarding is perfect for:

- Product tours and walkthroughs
- Feature introductions
- User onboarding flows
- Interactive tutorials
- Highlighting new features

## Vue Alternative

Looking for Vue? Check out [v-onboarding](https://github.com/fatihsolhan/v-onboarding).

## Quick Example

```tsx
import { useRef } from 'react'
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'

function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)

  const steps = [
    {
      attachTo: { element: '#feature' },
      content: { title: 'Hello!', description: 'Welcome to our app.' }
    }
  ]

  return (
    <>
      <ROnboardingWrapper ref={wrapperRef} steps={steps} />
      <button onClick={start}>Start Tour</button>
      <div id="feature">Feature Element</div>
    </>
  )
}
```

## Next Steps

- [Getting Started](/guide/getting-started) - Installation and setup
- [Basic Usage](/guide/basic-usage) - Learn the basics
- [API Reference](/api/props) - Explore all options
