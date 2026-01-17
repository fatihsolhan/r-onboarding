# Steps Configuration

## Step Interface

```ts
interface Step {
  attachTo: {
    element: string | HTMLElement | RefObject<HTMLElement>
    classList?: string[]
  }
  content?: {
    title?: string
    description?: string
    html?: boolean
  }
  options?: StepOptions
  on?: {
    beforeStep?: (options: HookOptions) => void | Promise<void>
    afterStep?: (options: HookOptions) => void | Promise<void>
  }
}
```

## Properties

### `attachTo` (required)

Specifies which element the step tooltip should point to.

```tsx
// CSS Selector
{ attachTo: { element: '#my-element' } }

// Class selector
{ attachTo: { element: '.nav-button' } }

// React ref
const buttonRef = useRef(null)
{ attachTo: { element: buttonRef } }

// Direct element reference
{ attachTo: { element: document.getElementById('my-element') } }
```

You can also add CSS classes to the attached element:

```tsx
{
  attachTo: {
    element: '#my-element',
    classList: ['highlighted', 'pulse-animation']
  }
}
```

### `content`

Content displayed in the default tooltip UI.

```ts
{
  content: {
    title: 'Welcome!',
    description: 'This is a detailed description of this step.'
  }
}
```

::: tip
When using render props, you can add any properties to `content` and access them via `step.content` in your render function.
:::

```ts
// Custom content properties
{
  content: {
    title: 'Welcome',
    description: 'Description here',
    icon: 'rocket',           // Custom property
    videoUrl: 'https://...',  // Custom property
    metadata: { ... }         // Custom property
  }
}
```

#### HTML Content

Render HTML in title and description by setting `html: true`:

```tsx
{
  content: {
    title: '<strong>Welcome!</strong>',
    description: 'Click <a href="#">here</a> for more info.',
    html: true
  }
}
```

::: warning
When using `html: true`, ensure content is sanitized to prevent XSS attacks.
:::

### `options`

Step-specific options that override global options.

```ts
{
  options: {
    popper: { placement: 'right' },
    overlay: { padding: 16 },
    scrollToStep: { enabled: false }
  }
}
```

### `on`

Lifecycle hooks for the step.

```ts
{
  on: {
    beforeStep: async ({ index, step, direction }) => {
      // Runs before this step is shown
      await loadData()
    },
    afterStep: ({ index, step, direction }) => {
      // Runs after leaving this step
      trackAnalytics()
    }
  }
}
```

#### Hook Options

```ts
interface HookOptions {
  index: number                      // Current step index (0-based)
  step: StepEntity                   // Current step object
  direction: 'forward' | 'backward'  // Navigation direction
}
```

## Complete Example

```tsx
const steps = [
  {
    attachTo: { element: '#welcome-button' },
    content: {
      title: 'Welcome to Our App',
      description: 'Let us show you around!'
    },
    options: {
      popper: { placement: 'bottom' }
    }
  },
  {
    attachTo: { element: '#dashboard-link' },
    content: {
      title: 'Dashboard',
      description: 'View your analytics and metrics here.'
    },
    options: {
      popper: { placement: 'right' },
      scrollToStep: {
        enabled: true,
        options: { behavior: 'smooth', block: 'center' }
      }
    },
    on: {
      beforeStep: async () => {
        await preloadDashboardData()
      }
    }
  },
  {
    attachTo: { element: '#settings-menu' },
    content: {
      title: 'Settings',
      description: 'Customize your experience.'
    },
    options: {
      overlay: { padding: 12, borderRadius: 8 }
    },
    on: {
      afterStep: () => {
        analytics.track('onboarding_completed')
      }
    }
  }
]
```
