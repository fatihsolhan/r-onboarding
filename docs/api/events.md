# Events

`ROnboardingWrapper` supports event callbacks to hook into the onboarding lifecycle.

## Props

| Name | Type | Description |
| :-------- | :-------- | :-------- |
| `onFinish` | `() => void` | Called when the user completes the onboarding by clicking the finish button |
| `onExit` | `(index: number) => void` | Called when the user exits the onboarding early (via exit button or programmatically) |

## onFinish

The `onFinish` callback is triggered when the user completes the entire onboarding flow by clicking the finish button on the last step.

```tsx
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  onFinish={() => {
    console.log('Onboarding completed!')
    // Save completion status, show success message, etc.
  }}
/>
```

## onExit

The `onExit` callback is triggered when the user exits the onboarding before completing all steps. It receives the current step index as a parameter.

```tsx
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  onExit={(index) => {
    console.log(`User exited at step ${index + 1}`)
    // Track analytics, save progress, etc.
  }}
/>
```

## Complete Example

```tsx
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'
import { useRef, useState } from 'react'

export default function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)
  const [status, setStatus] = useState('')

  const steps = [
    { attachTo: { element: '#step1' }, content: { title: 'Step 1' } },
    { attachTo: { element: '#step2' }, content: { title: 'Step 2' } },
    { attachTo: { element: '#step3' }, content: { title: 'Step 3' } }
  ]

  const handleFinish = () => {
    setStatus('Onboarding completed!')
    localStorage.setItem('onboarding_complete', 'true')
  }

  const handleExit = (index) => {
    setStatus(`Exited at step ${index + 1}`)
    // Optionally save progress
    localStorage.setItem('onboarding_progress', index.toString())
  }

  return (
    <div>
      <ROnboardingWrapper
        ref={wrapperRef}
        steps={steps}
        onFinish={handleFinish}
        onExit={handleExit}
      />
      <button onClick={start}>Start Tour</button>
      {status && <p>{status}</p>}
      <div id="step1">First Element</div>
      <div id="step2">Second Element</div>
      <div id="step3">Third Element</div>
    </div>
  )
}
```

## Difference Between onFinish and onExit

| Event | Trigger | Use Case |
| :---- | :------ | :------- |
| `onFinish` | User clicks "Finish" on last step | Mark onboarding as complete |
| `onExit` | User clicks close/exit button | Track abandonment, save progress |

::: tip
Both callbacks can be used together to handle all end-of-tour scenarios.
:::
