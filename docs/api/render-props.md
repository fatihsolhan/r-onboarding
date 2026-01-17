# Render Props

r-onboarding provides render props for complete UI customization.

## Default Render Prop

The main render prop for customizing step appearance.

### Render Props

| Prop | Type | Description |
|------|------|-------------|
| `step` | `Step` | Current step configuration |
| `next` | `() => void` | Navigate to next step |
| `previous` | `() => void` | Navigate to previous step |
| `exit` | `() => void` | Exit the tour |
| `isFirst` | `boolean` | Is current step the first? |
| `isLast` | `boolean` | Is current step the last? |
| `index` | `number` | Current step index (0-based) |

### Basic Usage

```tsx
<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast, index }) => (
    <ROnboardingStep>
      <div className="my-tooltip">
        <h3>{step.content?.title}</h3>
        <p>{step.content?.description}</p>

        <div className="actions">
          {!isFirst && <button onClick={previous}>Back</button>}
          <button onClick={next}>{isLast ? 'Finish' : 'Next'}</button>
        </div>
      </div>
    </ROnboardingStep>
  )}
</ROnboardingWrapper>
```

## ROnboardingStep

When using custom render content, wrap it with `ROnboardingStep` to maintain:

- Popper.js positioning
- SVG overlay functionality
- Proper z-index stacking

```tsx
import { ROnboardingWrapper, ROnboardingStep, useROnboarding } from 'r-onboarding'
import { useRef } from 'react'

function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)

  return (
    <ROnboardingWrapper ref={wrapperRef} steps={steps}>
      {({ step, next, index }) => (
        {/* Always wrap custom content with ROnboardingStep */}
        <ROnboardingStep>
          <MyCustomTooltip step={step} onNext={next} />
        </ROnboardingStep>
      )}
    </ROnboardingWrapper>
  )
}
```

## Conditional Rendering

Show custom UI for specific steps:

```tsx
<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast, index }) => (
    <>
      {/* Special design for step 3 */}
      {index === 2 ? (
        <ROnboardingStep>
          <SpecialWelcomeCard step={step} onContinue={next} />
        </ROnboardingStep>
      ) : (
        /* Default UI for others */
        <ROnboardingStep />
      )}
    </>
  )}
</ROnboardingWrapper>
```

## Without ROnboardingStep

If you need complete control and want to handle positioning yourself:

```tsx
import { createPortal } from 'react-dom'

<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next }) => (
    {/* No ROnboardingStep wrapper - you handle positioning */}
    createPortal(
      <div className="my-modal-overlay">
        <div className="my-modal">
          {step.content?.title}
          <button onClick={next}>Continue</button>
        </div>
      </div>,
      document.body
    )
  )}
</ROnboardingWrapper>
```

::: warning
Without `ROnboardingStep`, you lose automatic positioning and the SVG overlay.
:::
