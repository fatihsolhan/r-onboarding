# Getting Started

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

## Basic Setup

### Step 1: Import Components and Styles

Begin by importing the necessary components and stylesheet:

```tsx
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'
```

### Step 2: Configure Tour Steps

Define an array of steps that specify where highlights should appear and what content displays:

```tsx
const steps = [
  {
    attachTo: { element: '#step-1' },
    content: {
      title: 'Welcome!',
      description: 'Let us show you around.'
    }
  },
  {
    attachTo: { element: '#step-2' },
    content: {
      title: 'Features',
      description: 'Here are the key features.'
    }
  }
]
```

### Step 3: Implement Wrapper and Hook

Set up the wrapper component and initialize the hook to control tour flow:

```tsx
import { useRef, useEffect } from 'react'
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'

function App() {
  const wrapperRef = useRef(null)
  const { start, finish, goToStep } = useROnboarding(wrapperRef)

  const steps = [
    {
      attachTo: { element: '#step-1' },
      content: {
        title: 'Welcome!',
        description: 'Let us show you around.'
      }
    },
    {
      attachTo: { element: '#step-2' },
      content: {
        title: 'Features',
        description: 'Here are the key features.'
      }
    }
  ]

  useEffect(() => {
    start()
  }, [])

  return (
    <div>
      <ROnboardingWrapper ref={wrapperRef} steps={steps} />
      <button id="step-1">First Element</button>
      <div id="step-2">Second Element</div>
    </div>
  )
}
```

## Core Hook Methods

The `useROnboarding` hook offers three primary methods:

- **`start()`** – Begin the tour sequence from the first step
- **`finish()`** – Terminate the active tour
- **`goToStep(index)`** – Navigate directly to a specific step number
