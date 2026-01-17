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

### 1. Import the component and styles

```tsx
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'
```

### 2. Define your steps

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

### 3. Set up the wrapper and hook

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
      content: { title: 'Welcome!', description: 'Let us show you around.' }
    },
    {
      attachTo: { element: '#step-2' },
      content: { title: 'Features', description: 'Here are the key features.' }
    }
  ]

  // Start the tour when component mounts
  useEffect(() => start(), [])

  return (
    <div>
      <ROnboardingWrapper ref={wrapperRef} steps={steps} />

      {/* Your app content */}
      <button id="step-1">First Element</button>
      <div id="step-2">Second Element</div>
    </div>
  )
}
```

## Hook Methods

The `useROnboarding` hook provides these methods:

| Method | Description |
|--------|-------------|
| `start()` | Start the tour from the beginning |
| `finish()` | End the tour |
| `goToStep(index)` | Jump to a specific step |

## Next Steps

- [Basic Usage](/guide/basic-usage) - Learn about step configuration
- [Customization](/guide/customization) - Customize the overlay and positioning
- [Custom UI with Render Props](/guide/custom-slots) - Build your own step UI
