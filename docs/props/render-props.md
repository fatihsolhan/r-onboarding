# Render Props

When using custom UI, the following render props are available:

| Name | Type | Description |
| :-------- | :-------- | :-------- |
| `step` | [Step](/props/steps#step-structure) | Current step object |
| `next` | `Function` | Moves to the next step |
| `previous` | `Function` | Moves to the previous step |
| `exit` | `Function` | Exits from onboarding |
| `isFirst` | `Boolean` | Whether current step is the **first step** |
| `isLast` | `Boolean` | Whether current step is the **last step** |
| `index` | `Number` | Current step index (starts from 0) |

## Usage Example

```tsx
import { ROnboardingWrapper, ROnboardingStep, useROnboarding } from 'r-onboarding'
import { useRef } from 'react'

export default function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)

  const steps = [
    { attachTo: { element: '#foo' }, content: { title: 'Step 1' } },
    { attachTo: { element: '#bar' }, content: { title: 'Step 2' } }
  ]

  return (
    <ROnboardingWrapper ref={wrapperRef} steps={steps}>
      {({ step, next, previous, exit, isFirst, isLast, index }) => {
        if (!step) return null

        return (
          <ROnboardingStep>
            <div className="custom-step">
              <h3>{step.content?.title}</h3>
              <p>{step.content?.description}</p>
              <div className="actions">
                {!isFirst && <button onClick={previous}>Back</button>}
                <button onClick={next}>
                  {isLast ? 'Done' : 'Next'}
                </button>
                <button onClick={exit}>Skip</button>
              </div>
              <span>Step {index + 1} of {steps.length}</span>
            </div>
          </ROnboardingStep>
        )
      }}
    </ROnboardingWrapper>
  )
}
```
