# Next.js

r-onboarding provides first-class support for Next.js App Router with a dedicated entry point.

## Installation

::: code-group

```bash [npm]
npm install r-onboarding
```

```bash [yarn]
yarn add r-onboarding
```

```bash [pnpm]
pnpm add r-onboarding
```

:::

## Setup

Import from `r-onboarding/nextjs` instead of `r-onboarding`. This entry point includes the `'use client'` directive, making the components compatible with Next.js App Router.

```tsx
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding/nextjs'
import 'r-onboarding/dist/style.css'
```

## Example

```tsx
'use client'

import { useRef, useEffect } from 'react'
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding/nextjs'
import 'r-onboarding/dist/style.css'

export default function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)

  const steps = [
    {
      attachTo: { element: '#step-1' },
      content: { title: 'Welcome!', description: 'Let us show you around.' }
    },
    {
      attachTo: { element: '#step-2' },
      content: { title: 'Features', description: 'Here are the key features.' }
    }
  ]

  useEffect(() => start(), [])

  return (
    <div>
      <ROnboardingWrapper ref={wrapperRef} steps={steps} />
      <button id="step-1">First Element</button>
      <div id="step-2">Second Element</div>
    </div>
  )
}
```

## Why a separate entry point?

Next.js App Router uses React Server Components by default. Since r-onboarding uses client-side APIs (DOM manipulation, refs, effects), it must be marked as a client component.

The `r-onboarding/nextjs` entry point includes the `'use client'` directive at the bundle level, so you don't need to wrap every import manually.

## Compatibility

- Next.js 13+ (App Router)
- React 18+
