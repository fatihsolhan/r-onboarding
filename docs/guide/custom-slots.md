# Custom UI with Render Props

Build completely custom step interfaces using React's render props pattern.

## Default Render Prop

The `ROnboardingWrapper` provides a render prop with full access to step data and navigation:

```tsx
<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast, index }) => (
    {/* Your custom UI here */}
  )}
</ROnboardingWrapper>
```

### Render Props

| Prop | Type | Description |
|------|------|-------------|
| `step` | `Step` | Current step configuration |
| `next` | `() => void` | Go to next step (or finish if last) |
| `previous` | `() => void` | Go to previous step |
| `exit` | `() => void` | Exit the tour |
| `isFirst` | `boolean` | Is this the first step? |
| `isLast` | `boolean` | Is this the last step? |
| `index` | `number` | Current step index (0-based) |

## Using ROnboardingStep

::: warning Important
When using custom render content, wrap it with `ROnboardingStep` to maintain proper positioning and overlay functionality.
:::

```tsx
<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast, index }) => (
    <ROnboardingStep>
      {/* Custom content goes inside ROnboardingStep */}
      <div className="my-custom-tooltip">
        <h3>{step.content?.title}</h3>
        <p>{step.content?.description}</p>
        <button onClick={next}>
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </ROnboardingStep>
  )}
</ROnboardingWrapper>
```

## Conditional Custom UI

Show custom UI for specific steps only:

```tsx
<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast, index }) => (
    <>
      {/* Custom UI for step 3 */}
      {index === 2 ? (
        <ROnboardingStep>
          <MySpecialTooltip
            title={step.content?.title}
            onNext={next}
            onClose={exit}
          />
        </ROnboardingStep>
      ) : (
        /* Default UI for other steps */
        <ROnboardingStep />
      )}
    </>
  )}
</ROnboardingWrapper>
```

## Complete Custom Example

Here's a full example with a completely custom design:

```tsx
import { useRef } from 'react'
import { ROnboardingWrapper, ROnboardingStep, useROnboarding } from 'r-onboarding'

const steps = [
  {
    attachTo: { element: '#feature-1' },
    content: { title: 'Welcome!', description: 'Let us show you around.' }
  },
  {
    attachTo: { element: '#feature-2' },
    content: { title: 'Features', description: 'Here are key features.' }
  },
  {
    attachTo: { element: '#feature-3' },
    content: { title: 'Get Started', description: 'Ready to begin?' }
  }
]

function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)

  return (
    <>
      <ROnboardingWrapper ref={wrapperRef} steps={steps}>
        {({ step, next, previous, exit, isFirst, isLast, index }) => (
          <ROnboardingStep>
            <div className="custom-tooltip">
              {/* Header */}
              <div className="tooltip-header">
                <span className="step-badge">Step {index + 1}</span>
                <button onClick={exit} className="close-btn">×</button>
              </div>

              {/* Content */}
              <h3 className="tooltip-title">{step.content?.title}</h3>
              <p className="tooltip-description">{step.content?.description}</p>

              {/* Progress */}
              <div className="progress-dots">
                {steps.map((_, i) => (
                  <span key={i} className={`dot ${i === index ? 'active' : ''}`} />
                ))}
              </div>

              {/* Actions */}
              <div className="tooltip-actions">
                {!isFirst && (
                  <button onClick={previous} className="btn-secondary">
                    Back
                  </button>
                )}
                <button onClick={next} className="btn-primary">
                  {isLast ? 'Done' : 'Continue'}
                </button>
              </div>
            </div>
          </ROnboardingStep>
        )}
      </ROnboardingWrapper>

      <div id="feature-1">Feature 1</div>
      <div id="feature-2">Feature 2</div>
      <div id="feature-3">Feature 3</div>
      <button onClick={start}>Start Tour</button>
    </>
  )
}
```

```css
.custom-tooltip {
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 320px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.step-badge {
  background: #d4ff00;
  color: #000;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.tooltip-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.tooltip-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.progress-dots {
  display: flex;
  gap: 6px;
  margin: 16px 0;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
}

.dot.active {
  background: #d4ff00;
}

.tooltip-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn-primary {
  flex: 1;
  padding: 10px 20px;
  background: #d4ff00;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}
```

## Hiding the Arrow

For custom designs that don't need the pointer arrow:

```css
/* Hide arrow for custom tooltip */
.custom-tooltip ~ [data-popper-arrow] {
  display: none;
}
```

Or style it to match your design:

```css
.custom-tooltip ~ [data-popper-arrow]::before {
  background: white !important;
  border: none !important;
}
```
