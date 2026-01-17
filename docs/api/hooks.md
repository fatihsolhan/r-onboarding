# Hooks

Hooks allow you to run code at specific points during the tour.

## Available Hooks

### beforeStep

Runs before a step is shown. Supports async operations.

```tsx
{
  attachTo: { element: '#feature' },
  content: { title: 'Feature' },
  on: {
    beforeStep: async ({ index, step, direction }) => {
      // Load data
      await fetchData()

      // Update UI state
      setSidebarOpen(true)

      // Track analytics
      analytics.track('tour_step_view', { step: index })
    }
  }
}
```

### afterStep

Runs after leaving a step. Also supports async operations.

```tsx
{
  attachTo: { element: '#feature' },
  content: { title: 'Feature' },
  on: {
    afterStep: ({ index, step, direction }) => {
      // Cleanup
      setSidebarOpen(false)

      // Track completion
      analytics.track('tour_step_complete', {
        step: index,
        direction
      })
    }
  }
}
```

## Hook Parameters

Both hooks receive an options object:

```typescript
interface HookOptions {
  index: number           // Current step index (0-based)
  step: StepEntity        // Current step configuration
  direction: 'forward' | 'backward'  // Navigation direction
}
```

## Direction Parameter

The `direction` parameter indicates how the user is navigating:

- `'forward'` - User clicked "Next" or the tour just started
- `'backward'` - User clicked "Previous"

```tsx
on: {
  beforeStep: ({ direction }) => {
    if (direction === 'backward') {
      console.log('User is going back')
    }
  },
  afterStep: ({ direction }) => {
    if (direction === 'forward') {
      console.log('User completed this step')
    }
  }
}
```

## Common Use Cases

### Data Loading

Load necessary data before showing a step:

```tsx
{
  attachTo: { element: '#user-list' },
  content: { title: 'User Management' },
  on: {
    beforeStep: async () => {
      await loadUsers()
    }
  }
}
```

### Theme Changes

Apply temporary styles during a step:

```tsx
{
  attachTo: { element: '#dark-feature' },
  content: { title: 'Dark Mode Feature' },
  on: {
    beforeStep: () => {
      document.body.classList.add('light-overlay-theme')
    },
    afterStep: () => {
      document.body.classList.remove('light-overlay-theme')
    }
  }
}
```

### UI State Management

Ensure UI elements are in the correct state:

```tsx
{
  attachTo: { element: '#sidebar-menu' },
  content: { title: 'Navigation Menu' },
  on: {
    beforeStep: () => {
      setSidebarExpanded(true)
    },
    afterStep: () => {
      setSidebarExpanded(false)
    }
  }
}
```

### Analytics Tracking

Track user progression through the tour:

```tsx
{
  attachTo: { element: '#cta' },
  content: { title: 'Get Started' },
  on: {
    beforeStep: ({ index }) => {
      analytics.track('tour_step_viewed', { step_index: index })
    },
    afterStep: ({ index, direction }) => {
      analytics.track('tour_step_left', {
        step_index: index,
        direction
      })
    }
  }
}
```

## Error Handling

Errors in hooks won't break the tour. However, it's recommended to use try-catch for critical operations:

```tsx
on: {
  beforeStep: async ({ index }) => {
    try {
      await criticalOperation()
    } catch (error) {
      console.error(`Failed at step ${index}:`, error)
      // Tour continues regardless
    }
  }
}
```
