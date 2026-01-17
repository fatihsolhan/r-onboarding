# Props

The `ROnboardingWrapper` component accepts the following props:

## steps

- **Type:** `StepEntity[]`
- **Required:** Yes

An array of step configurations. See [Steps Configuration](/api/steps) for details.

```tsx
const steps = [
  {
    attachTo: { element: '#element-1' },
    content: { title: 'Step 1', description: 'Description' }
  }
]

<ROnboardingWrapper ref={wrapperRef} steps={steps} />
```

## options

- **Type:** `ROnboardingWrapperOptions`
- **Required:** No

Global options for all steps. See [Options](/api/options) for all available options.

```tsx
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  options={{
    overlay: { enabled: true, padding: 8 },
    scrollToStep: { enabled: true }
  }}
/>
```

## onFinish

- **Type:** `() => void`
- **Required:** No

Callback fired when the tour is completed (user clicks Finish on the last step).

```tsx
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  onFinish={() => console.log('Tour completed!')}
/>
```

## onExit

- **Type:** `(index: number) => void`
- **Required:** No

Callback fired when the user exits the tour early. Receives the current step index.

```tsx
<ROnboardingWrapper
  ref={wrapperRef}
  steps={steps}
  onExit={(index) => console.log(`Exited at step ${index}`)}
/>
```

## children (Render Props)

- **Type:** `(props: RenderProps) => ReactNode`
- **Required:** No

Render function for custom step UI. See [Slots](/api/slots) for details.

```tsx
<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast, index }) => (
    <ROnboardingStep>
      {/* Custom UI */}
    </ROnboardingStep>
  )}
</ROnboardingWrapper>
```
