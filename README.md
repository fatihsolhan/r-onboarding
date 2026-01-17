<div align="center">

# r-onboarding

A fully-typed, customizable onboarding component for React

[![Version](https://img.shields.io/npm/v/r-onboarding.svg?style=flat-square)](https://www.npmjs.com/package/r-onboarding)
[![License](https://img.shields.io/npm/l/r-onboarding.svg?style=flat-square)](https://www.npmjs.com/package/r-onboarding)
[![Downloads](https://img.shields.io/npm/dm/r-onboarding.svg?style=flat-square)](https://www.npmjs.com/package/r-onboarding)

[Demo](https://r-onboarding.fatihsolhan.com/) · [Documentation](https://r-onboarding-docs.fatihsolhan.com/)

</div>

---

## Features

- **TypeScript First** - Full type support out of the box
- **Customizable UI** - Use default styling or bring your own with render props
- **Flexible Positioning** - Smart tooltip placement with Popper.js
- **SVG Overlay** - Highlight elements with customizable overlay
- **Lifecycle Hooks** - `onBeforeStep`, `onAfterStep` for custom logic

## Installation

```sh
# npm
npm install r-onboarding

# yarn
yarn add r-onboarding

# pnpm
pnpm add r-onboarding
```

## Quick Start

```tsx
import { useRef } from 'react'
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'

function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)

  const steps = [
    {
      attachTo: { element: '#feature-1' },
      content: { title: 'Welcome!', description: 'Let me show you around.' }
    },
    {
      attachTo: { element: '#feature-2' },
      content: { title: 'Next Feature', description: 'Here is another feature.' }
    }
  ]

  return (
    <>
      <ROnboardingWrapper ref={wrapperRef} steps={steps} />

      <button onClick={start}>Start Tour</button>

      <div id="feature-1">Feature 1</div>
      <div id="feature-2">Feature 2</div>
    </>
  )
}
```

## Custom Step UI

Use render props to create your own step UI:

```tsx
<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast }) => (
    <ROnboardingStep>
      <div className="my-custom-tooltip">
        <h3>{step.content.title}</h3>
        <p>{step.content.description}</p>
        {!isFirst && <button onClick={previous}>Back</button>}
        <button onClick={isLast ? exit : next}>
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </ROnboardingStep>
  )}
</ROnboardingWrapper>
```

## Styling

Customize the overlay and tooltips with CSS variables:

```css
:root {
  --r-onboarding-overlay-z: 10;
  --r-onboarding-step-z: 20;

  /* SVG Overlay */
  --r-onboarding-overlay-fill: rgba(0, 0, 0, 0.75);

  /* Tooltip */
  --r-onboarding-step-arrow-background: white;
}
```

## Documentation

For full documentation including all props, events, hooks, and examples, visit the [documentation site](https://r-onboarding-docs.fatihsolhan.com/).

## License

MIT
