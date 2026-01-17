# Basic Tour

A simple onboarding tour with default UI.

## Code

```tsx
import { useRef } from 'react'
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'

function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)

  const steps = [
    {
      attachTo: { element: '#step-1' },
      content: {
        title: 'Welcome!',
        description: 'This is the first step of your tour.'
      }
    },
    {
      attachTo: { element: '#step-2' },
      content: {
        title: 'Features',
        description: 'Discover all the amazing features.'
      }
    },
    {
      attachTo: { element: '#step-3' },
      content: {
        title: 'Get Started',
        description: 'You are ready to go!'
      }
    }
  ]

  return (
    <>
      <ROnboardingWrapper ref={wrapperRef} steps={steps} />

      <button onClick={start}>Start Tour</button>

      <div id="step-1">Step 1 Element</div>
      <div id="step-2">Step 2 Element</div>
      <div id="step-3">Step 3 Element</div>
    </>
  )
}
```

## With Callbacks

```tsx
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  onFinish={() => {
    console.log('Tour completed!')
  }}
  onExit={(index) => {
    console.log(`User exited at step ${index}`)
  }}
/>
```

## With Lifecycle Hooks

```tsx
const steps = [
  {
    attachTo: { element: '#step-1' },
    content: { title: 'Step 1', description: 'Description' },
    on: {
      beforeStep: ({ index, direction }) => {
        console.log(`Entering step ${index}, direction: ${direction}`)
      },
      afterStep: ({ index, direction }) => {
        console.log(`Leaving step ${index}, direction: ${direction}`)
      }
    }
  }
]
```
