# Steps

`steps` is an array of `Step` objects.

## Step Structure

```ts
{
  attachTo: {
    element: "#foo",
    classList: ["attached", "bar"]
  },
  content: {
    title: "...",
    description: "...",
    html: false
  },
  on: {
    beforeStep: function(options) {},
    afterStep: function(options) {}
  },
  options: {}
}
```

## Properties

| Name | Type | Default | Description |
| :-------- | :-------- | :-------- | :-------- |
| `attachTo` | `Object` | | |
| `attachTo.element` | `String` \| `Function` | **Required** | Element to attach onboarding step |
| `attachTo.classList` | `String[]` | **Optional** | CSS classes to be added to attached element |
| `content` | `Object` | **Optional** | |
| `content.title` | `String` | **Optional** | Title to use in onboarding step |
| `content.description` | `String` | **Optional** | Description to use in onboarding step |
| `content.html` | `Boolean` | `false` | Render title and description as HTML |
| `on` | `Object` | **Optional** | |
| `on.beforeStep` | `Function` \| `AsyncFunction` | **Optional** | Function to run before showing the step |
| `on.afterStep` | `Function` | **Optional** | Function to run after showing the step |
| `options` | [Options](/api/options) | **Optional** | Options for step. Overrides the `ROnboardingWrapper` options |

## Lifecycle Hook Options

The `beforeStep` and `afterStep` hooks receive an options object with the following properties:

```ts
interface HookOptions {
  index: number;          // Current step index (0-based)
  step: StepEntity;       // Current step object
  direction: 'forward' | 'backward';  // Navigation direction
}
```

### Example

```tsx
const steps = [
  {
    attachTo: { element: '#foo' },
    content: { title: 'Welcome!' },
    on: {
      beforeStep: ({ index, step, direction }) => {
        console.log(`Before step ${index}, direction: ${direction}`);
      },
      afterStep: ({ index, step, direction }) => {
        console.log(`After step ${index}, direction: ${direction}`);
      }
    }
  }
];
```

## HTML Content

You can render HTML content in the title and description by setting `content.html` to `true`:

```tsx
const steps = [
  {
    attachTo: { element: '#foo' },
    content: {
      title: '<strong>Welcome!</strong>',
      description: 'Click <a href="#">here</a> for more info.',
      html: true
    }
  }
];
```

::: warning
When using `html: true`, make sure the content is sanitized to prevent XSS attacks.
:::
