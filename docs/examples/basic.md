# Basic Example

This is a basic example with default styles.

```tsx
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'
import { useRef } from 'react'

export default function App() {
  const steps = [
    {
      attachTo: { element: '#foo' },
      content: { title: 'Welcome!' }
    },
    {
      attachTo: { element: '#bar' },
      content: {
        title: 'Do it!',
        description: "This is a description field and I really don't know what to write here..."
      }
    }
  ]

  const wrapperRef = useRef(null)
  const { start, goToStep, finish } = useROnboarding(wrapperRef)

  return (
    <div>
      <ROnboardingWrapper ref={wrapperRef} steps={steps} />

      <span id="foo">Howdy, My Friend!</span>
      <button id="bar">Click me for no reason</button>

      <button onClick={() => goToStep(1)}>Click to go second step</button>

      <div>
        <button onClick={start}>Start Onboarding</button>
        <button onClick={finish}>Finish Onboarding</button>
      </div>
    </div>
  )
}
```

## With Event Callbacks

```tsx
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'
import { useRef } from 'react'

export default function App() {
  const steps = [
    {
      attachTo: { element: '#foo' },
      content: { title: 'Welcome!' }
    },
    {
      attachTo: { element: '#bar' },
      content: { title: 'Almost done!' }
    }
  ]

  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)

  return (
    <div>
      <ROnboardingWrapper
        ref={wrapperRef}
        steps={steps}
        onFinish={() => console.log('Tour completed!')}
        onExit={(index) => console.log(`Exited at step ${index}`)}
      />

      <span id="foo">First Element</span>
      <button id="bar">Second Element</button>
      <button onClick={start}>Start Tour</button>
    </div>
  )
}
```
