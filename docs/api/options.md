# Options

::: info
This prop can be passed to both:
- `ROnboardingWrapper`
- Individual steps via `step.options`

You can override `ROnboardingWrapper`'s options by passing options to individual steps.
:::

## Default Values

```js
{
  popper: {},
  overlay: {
    enabled: true,
    padding: 0,
    borderRadius: 0
  },
  scrollToStep: {
    enabled: true,
    options: {
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    }
  },
  labels: {
    previousButton: 'Previous',
    nextButton: 'Next',
    finishButton: 'Finish'
  },
  hideButtons: {
    previous: false,
    next: false
  },
  disableInteraction: false
}
```

## Properties

| Name | Type | Default | Description |
| :-------- | :-------- | :-------- | :-------- |
| `popper` | [PopperJS options](https://popper.js.org/docs/v2/constructors/#options) | `{}` | PopperJS positioning options |
| `overlay` | `Object` | | Overlay configuration |
| `overlay.enabled` | `Boolean` | `true` | Enable/disable the overlay |
| `overlay.padding` | `Number` \| `Object` | `0` | Padding around the highlighted element |
| `overlay.borderRadius` | `Number` \| `Object` | `0` | Border radius for the highlighted area |
| `scrollToStep` | `Object` | | Scroll behavior configuration |
| `scrollToStep.enabled` | `Boolean` | `true` | Enable/disable auto-scroll to step |
| `scrollToStep.options` | [ScrollIntoViewOptions](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) | `{ behavior: 'smooth', block: 'center', inline: 'center' }` | Scroll options |
| `labels` | `Object` | | Button labels |
| `labels.previousButton` | `String` | `'Previous'` | Label for previous button |
| `labels.nextButton` | `String` | `'Next'` | Label for next button |
| `labels.finishButton` | `String` | `'Finish'` | Label for finish button |
| `hideButtons` | `Object` | | Hide navigation buttons |
| `hideButtons.previous` | `Boolean` | `false` | Hide the previous button |
| `hideButtons.next` | `Boolean` | `false` | Hide the next button |
| `disableInteraction` | `Boolean` | `false` | Disable page interaction during onboarding |

## Overlay Padding

The `overlay.padding` option can be a number (applied to all sides) or an object:

```ts
{
  overlay: {
    padding: { top: 10, right: 10, bottom: 10, left: 10 }
  }
}
```

## Overlay Border Radius

The `overlay.borderRadius` option can be a number (applied to all corners) or an object:

```ts
{
  overlay: {
    borderRadius: { leftTop: 10, rightTop: 10, rightBottom: 10, leftBottom: 10 }
  }
}
```

## Hide Buttons

You can hide the Previous and/or Next buttons:

```tsx
// Hide previous button on all steps
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  options={{ hideButtons: { previous: true } }}
/>
```

Or override per step:

```ts
const steps = [
  {
    attachTo: { element: '#foo' },
    content: { title: 'Step 1' },
    options: { hideButtons: { previous: true } }
  },
  {
    attachTo: { element: '#bar' },
    content: { title: 'Step 2' }
    // Previous button will be shown (using wrapper defaults)
  }
];
```

## Disable Interaction

When `disableInteraction` is `true`, the page will not be interactive during onboarding. Only the step element remains interactive:

```tsx
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  options={{ disableInteraction: true }}
/>
```

This is useful when you want to prevent users from clicking on elements outside the onboarding step.
