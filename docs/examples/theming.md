# Theming

This example demonstrates how to apply different themes to your onboarding tour using CSS classes and lifecycle hooks.

## Basic Theme Switching

Apply different themes to each step using `beforeStep` hooks:

```tsx
import { useRef } from 'react'
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'

const themes = [
  'step-theme-default',
  'step-theme-accent',
  'step-theme-warm',
  'step-theme-cool',
  'step-theme-purple'
]

function App() {
  const wrapperRef = useRef(null)
  const { start, finish } = useROnboarding(wrapperRef)

  const setTheme = (theme: string) => {
    themes.forEach(t => document.body.classList.remove(t))
    document.body.classList.add(theme)
  }

  const clearTheme = () => {
    themes.forEach(t => document.body.classList.remove(t))
  }

  const steps = [
    {
      attachTo: { element: '#feature-1' },
      content: {
        title: 'Welcome',
        description: 'Let us show you around.'
      },
      on: {
        beforeStep: () => setTheme('step-theme-default')
      }
    },
    {
      attachTo: { element: '#feature-2' },
      content: {
        title: 'Accent Theme',
        description: 'This step uses the accent theme.'
      },
      on: {
        beforeStep: () => setTheme('step-theme-accent')
      }
    },
    {
      attachTo: { element: '#feature-3' },
      content: {
        title: 'Warm Theme',
        description: 'A warm, inviting color scheme.'
      },
      on: {
        beforeStep: () => setTheme('step-theme-warm')
      }
    }
  ]

  const handleFinish = () => {
    clearTheme()
  }

  const handleExit = () => {
    clearTheme()
    finish()
  }

  return (
    <div>
      <ROnboardingWrapper
        ref={wrapperRef}
        steps={steps}
        onFinish={handleFinish}
        onExit={handleExit}
      />
      <div id="feature-1">Feature 1</div>
      <div id="feature-2">Feature 2</div>
      <div id="feature-3">Feature 3</div>
      <button onClick={start}>Start Tour</button>
    </div>
  )
}
```

## Theme CSS

Define your theme styles:

```css
/* Default theme */
.step-theme-default {
  --r-onboarding-step-arrow-background: #ffffff;
}

/* Accent theme */
.step-theme-accent {
  --r-onboarding-step-arrow-background: #4f46e5;
}

.step-theme-accent .r-onboarding-item {
  background: #4f46e5;
  color: white;
}

/* Warm theme */
.step-theme-warm {
  --r-onboarding-step-arrow-background: #f59e0b;
}

.step-theme-warm .r-onboarding-item {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  color: white;
}

/* Cool theme */
.step-theme-cool {
  --r-onboarding-step-arrow-background: #06b6d4;
}

.step-theme-cool .r-onboarding-item {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  color: white;
}

/* Purple theme */
.step-theme-purple {
  --r-onboarding-step-arrow-background: #8b5cf6;
}

.step-theme-purple .r-onboarding-item {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
}
```

## Dark Mode Support

Adjust themes based on system preference:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --r-onboarding-step-arrow-background: #1f2937;
  }

  .r-onboarding-item {
    background: #1f2937;
    color: #f9fafb;
  }
}
```

## Custom Theme with Render Props

For complete control, use render props with your theme:

```tsx
<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast, index }) => {
    if (!step) return null

    const themeClass = step.content?.theme || 'default'

    return (
      <ROnboardingStep>
        <div className={`custom-tooltip theme-${themeClass}`}>
          <h3>{step.content?.title}</h3>
          <p>{step.content?.description}</p>
          <div className="actions">
            {!isFirst && <button onClick={previous}>Back</button>}
            <button onClick={next}>{isLast ? 'Done' : 'Next'}</button>
          </div>
        </div>
      </ROnboardingStep>
    )
  }}
</ROnboardingWrapper>
```

With custom theme properties in steps:

```tsx
const steps = [
  {
    attachTo: { element: '#feature' },
    content: {
      title: 'Themed Step',
      description: 'This step has a custom theme.',
      theme: 'accent' // Custom property
    }
  }
]
```
