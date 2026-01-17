# Basic Usage

This guide covers the essential configuration options for creating onboarding tours.

## Step Configuration

Each step requires an `attachTo` property and can include content, options, and lifecycle hooks:

```tsx
const steps = [
  {
    attachTo: { element: '#welcome' },
    content: {
      title: 'Welcome!',
      description: 'Let us show you around the app.'
    }
  },
  {
    attachTo: { element: '#features' },
    content: {
      title: 'Key Features',
      description: 'Discover what you can do here.'
    },
    options: {
      popper: { placement: 'bottom' }
    }
  }
]
```

## Element Targeting

The `attachTo.element` property supports multiple formats:

```tsx
// CSS selector
{ attachTo: { element: '#my-element' } }

// Class selector
{ attachTo: { element: '.my-class' } }

// Complex selector
{ attachTo: { element: '[data-tour="step-1"]' } }

// Function returning element
{ attachTo: { element: () => document.querySelector('#dynamic') } }
```

## Adding Classes to Target Element

You can add CSS classes to the highlighted element during its step:

```tsx
{
  attachTo: {
    element: '#my-element',
    classList: ['highlighted', 'pulse-animation']
  }
}
```

## Controlling the Tour

The `useROnboarding` hook provides methods to control the tour:

```tsx
const wrapperRef = useRef(null)
const { start, finish, goToStep } = useROnboarding(wrapperRef)

// Start the tour
start()

// Jump to a specific step
goToStep(2)

// End the tour
finish()
```

## Event Callbacks

Listen to tour completion and exit events:

```tsx
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  onFinish={() => {
    console.log('Tour completed!')
    localStorage.setItem('tour_completed', 'true')
  }}
  onExit={(stepIndex) => {
    console.log(`Tour exited at step ${stepIndex}`)
  }}
/>
```

## Complete Example

```tsx
import { useRef, useEffect } from 'react'
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'

function App() {
  const wrapperRef = useRef(null)
  const { start, goToStep, finish } = useROnboarding(wrapperRef)

  const steps = [
    {
      attachTo: { element: '#header' },
      content: {
        title: 'Navigation',
        description: 'Use the header to navigate around the app.'
      }
    },
    {
      attachTo: { element: '#sidebar' },
      content: {
        title: 'Sidebar',
        description: 'Access your settings and profile here.'
      },
      options: {
        popper: { placement: 'right' }
      }
    },
    {
      attachTo: { element: '#main-content' },
      content: {
        title: 'Main Area',
        description: 'This is where the magic happens!'
      }
    }
  ]

  const handleFinish = () => {
    console.log('Welcome tour completed!')
  }

  const handleExit = (stepIndex) => {
    console.log(`User exited at step ${stepIndex}`)
  }

  return (
    <div>
      <ROnboardingWrapper
        ref={wrapperRef}
        steps={steps}
        onFinish={handleFinish}
        onExit={handleExit}
      />
      <header id="header">Header</header>
      <aside id="sidebar">Sidebar</aside>
      <main id="main-content">Main Content</main>
      <button onClick={start}>Start Tour</button>
    </div>
  )
}
```
