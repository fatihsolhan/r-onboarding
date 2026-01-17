# Custom Slots

r-onboarding uses React's render props pattern to give you complete control over the step UI.

## Using Render Props

Pass a function as children to `ROnboardingWrapper` to access step data and navigation methods:

```tsx
<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast, index }) => {
    if (!step) return null

    return (
      <ROnboardingStep>
        {/* Your custom UI here */}
      </ROnboardingStep>
    )
  }}
</ROnboardingWrapper>
```

## Available Render Props

| Prop | Type | Description |
|------|------|-------------|
| `step` | `StepEntity` | Current step object |
| `next` | `() => void` | Move to next step or finish tour |
| `previous` | `() => void` | Move to previous step |
| `exit` | `() => void` | Exit the tour early |
| `isFirst` | `boolean` | Whether this is the first step |
| `isLast` | `boolean` | Whether this is the last step |
| `index` | `number` | Current step index (0-based) |

## ROnboardingStep Component

Always wrap your custom UI in `ROnboardingStep` to ensure proper positioning and overlay behavior:

```tsx
import { ROnboardingStep } from 'r-onboarding'

<ROnboardingStep>
  <div className="my-custom-tooltip">
    {/* Content */}
  </div>
</ROnboardingStep>
```

## Complete Custom UI Example

```tsx
import { useRef } from 'react'
import { ROnboardingWrapper, ROnboardingStep, useROnboarding } from 'r-onboarding'
// Note: Don't import default styles when using custom UI
// import 'r-onboarding/dist/style.css'

function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)

  const steps = [
    {
      attachTo: { element: '#feature-1' },
      content: {
        title: 'Welcome!',
        description: 'Let us show you around.'
      }
    },
    {
      attachTo: { element: '#feature-2' },
      content: {
        title: 'Key Feature',
        description: 'This is an important feature.'
      }
    }
  ]

  return (
    <div>
      <ROnboardingWrapper ref={wrapperRef} steps={steps}>
        {({ step, next, previous, exit, isFirst, isLast, index }) => {
          if (!step) return null

          return (
            <ROnboardingStep>
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
                {/* Close button */}
                <button
                  onClick={exit}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">
                  {step.content?.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {step.content?.description}
                </p>

                {/* Progress indicator */}
                <div className="text-sm text-gray-400 mb-4">
                  Step {index + 1} of {steps.length}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  {!isFirst && (
                    <button
                      onClick={previous}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={next}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto"
                  >
                    {isLast ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            </ROnboardingStep>
          )
        }}
      </ROnboardingWrapper>

      <div id="feature-1">Feature 1</div>
      <div id="feature-2">Feature 2</div>
      <button onClick={start}>Start Tour</button>
    </div>
  )
}
```

## Custom Content Properties

You can add custom properties to `step.content` and access them in your render function:

```tsx
const steps = [
  {
    attachTo: { element: '#feature' },
    content: {
      title: 'New Feature',
      description: 'Check out this new feature.',
      icon: '🎉',
      videoUrl: 'https://example.com/demo.mp4',
      badge: 'New'
    }
  }
]

// In render function
<div>
  {step.content?.icon && <span>{step.content.icon}</span>}
  {step.content?.badge && (
    <span className="badge">{step.content.badge}</span>
  )}
  <h3>{step.content?.title}</h3>
</div>
```

## HTML Content

Enable HTML rendering in step content:

```tsx
const steps = [
  {
    attachTo: { element: '#feature' },
    content: {
      title: '<strong>Important!</strong>',
      description: 'Click <a href="#">here</a> for more info.',
      html: true
    }
  }
]
```

::: warning
When using `html: true`, ensure content is sanitized to prevent XSS attacks.
:::
