# Advanced Usage

Learn how to customize styling and create custom step components.

## Default Usage

This is the default [Usage](/guide/usage):

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

## Custom UI

Let's remove the default styling:

```diff
- import 'r-onboarding/dist/style.css'
```

And import the `ROnboardingStep` component:

```diff
- import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
+ import { ROnboardingWrapper, ROnboardingStep, useROnboarding } from 'r-onboarding'
```

You can now implement your custom UI by using [Render Props](/props/render-props):

```tsx
<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast, index }) => {
    if (!step) return null
    return (
      <ROnboardingStep>
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                {step.content?.title && (
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {step.content.title}
                  </h3>
                )}
                {step.content?.description && (
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>{step.content.description}</p>
                  </div>
                )}
              </div>
              <div className="mt-5 space-x-4 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center relative">
                <span className="absolute right-0 bottom-full mb-2 mr-2 text-gray-600 font-medium text-xs">
                  {`${index + 1}/${steps.length}`}
                </span>
                {!isFirst && (
                  <button
                    onClick={previous}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 font-medium text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={next}
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                >
                  {isLast ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ROnboardingStep>
    )
  }}
</ROnboardingWrapper>
```
