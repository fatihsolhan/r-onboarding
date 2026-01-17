# Usage

Learn how to use r-onboarding in your React application.

## Create a steps array

```ts
const steps = [
  { attachTo: { element: '#foo' }, content: { title: "Welcome!" } }
]
```

See [Steps](/props/steps) for available options.

## Create a ref

Create a `ref` to pass to the `ROnboardingWrapper` component and `useROnboarding` hook:

```ts
const wrapperRef = useRef(null)
const { start, goToStep, finish } = useROnboarding(wrapperRef)
```

## Complete Example

After importing `ROnboardingWrapper`, `useROnboarding` and `style.css`, your component should look like this:

```tsx
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'
import { useRef } from 'react'

export default function App() {
  const steps = [
    { attachTo: { element: '#foo' }, content: { title: "Welcome!" } }
  ]
  const wrapperRef = useRef(null)
  const { start, goToStep, finish } = useROnboarding(wrapperRef)

  return (
    <div>
      <ROnboardingWrapper ref={wrapperRef} steps={steps} />
      {/* ... */}
    </div>
  )
}
```

You can now start the onboarding by calling the `start` function or in a `useEffect` hook:

```tsx
useEffect(() => start(), [])
```

Please check out the [Advanced Usage](/guide/advanced-usage) if you want to customize the step UI.
