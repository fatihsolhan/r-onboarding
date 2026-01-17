# Customization

r-onboarding provides extensive customization options through global options, per-step overrides, and CSS variables.

## Global Options

Set default options for all steps via the `options` prop:

```tsx
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  options={{
    popper: {
      placement: 'bottom',
      modifiers: [{ name: 'offset', options: { offset: [0, 10] } }]
    },
    overlay: {
      enabled: true,
      padding: 8,
      borderRadius: 4
    },
    scrollToStep: {
      enabled: true,
      options: { behavior: 'smooth', block: 'center' }
    },
    labels: {
      previousButton: 'Back',
      nextButton: 'Continue',
      finishButton: 'Got it!'
    }
  }}
/>
```

## Per-Step Overrides

Override global options for specific steps:

```tsx
const steps = [
  {
    attachTo: { element: '#sidebar' },
    content: { title: 'Sidebar' },
    options: {
      popper: { placement: 'right' },
      overlay: { padding: 16 }
    }
  }
]
```

## Overlay Customization

### Padding

Add space around the highlighted element:

```tsx
// Uniform padding
overlay: { padding: 10 }

// Different padding per side
overlay: {
  padding: { top: 10, right: 20, bottom: 10, left: 20 }
}
```

### Border Radius

Round the corners of the highlight:

```tsx
// Uniform radius
overlay: { borderRadius: 8 }

// Different radius per corner
overlay: {
  borderRadius: {
    leftTop: 8,
    rightTop: 8,
    rightBottom: 8,
    leftBottom: 8
  }
}
```

## Button Customization

### Custom Labels

```tsx
options={{
  labels: {
    previousButton: 'Back',
    nextButton: 'Continue',
    finishButton: 'Done!'
  }
}}
```

### Hiding Buttons

Hide navigation buttons globally or per step:

```tsx
// Hide previous button globally
options={{ hideButtons: { previous: true } }}

// Hide buttons for specific step
{
  attachTo: { element: '#intro' },
  content: { title: 'Welcome' },
  options: { hideButtons: { previous: true, next: false } }
}
```

## Disable Interaction

Prevent users from interacting with elements outside the tour:

```tsx
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  options={{ disableInteraction: true }}
/>
```

When enabled, `pointer-events: none` is applied to the document body, while the step tooltip remains interactive.

## CSS Variables

Customize the appearance using CSS variables:

```css
:root {
  /* Overlay */
  --r-onboarding-overlay-z: 10;

  /* Step tooltip */
  --r-onboarding-step-z: 20;
  --r-onboarding-step-arrow-size: 10px;
  --r-onboarding-step-arrow-background: white;
}
```

See [CSS Variables](/api/css-variables) for the complete list.
