# Theming Example

Change overlay and tooltip colors dynamically between steps.

## Code

```tsx
import { useRef, useState } from 'react'
import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'
import './themes.css'

function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)
  const [currentTheme, setCurrentTheme] = useState('')

  const clearTheme = () => setCurrentTheme('')

  const steps = [
    {
      attachTo: { element: '#hero' },
      content: {
        title: 'Welcome',
        description: 'Notice the subtle light overlay on this dark background.'
      },
      on: {
        beforeStep: () => setCurrentTheme('theme-default')
      }
    },
    {
      attachTo: { element: '#features' },
      content: {
        title: 'Chartreuse Theme',
        description: 'The overlay changed to a vibrant chartreuse color!'
      },
      on: {
        beforeStep: () => setCurrentTheme('theme-accent')
      }
    },
    {
      attachTo: { element: '#pricing' },
      content: {
        title: 'Warm Orange',
        description: 'Now with a warm orange glow. Each step can have its own theme.'
      },
      on: {
        beforeStep: () => setCurrentTheme('theme-warm')
      }
    },
    {
      attachTo: { element: '#cta' },
      content: {
        title: 'Cool Cyan',
        description: 'Finishing with a cool cyan vibe. The possibilities are endless!'
      },
      on: {
        beforeStep: () => setCurrentTheme('theme-cool')
      }
    }
  ]

  return (
    <div className={currentTheme}>
      <ROnboardingWrapper
        ref={wrapperRef}
        steps={steps}
        onFinish={clearTheme}
        onExit={clearTheme}
      />

      {/* Demo content with dark background */}
      <div className="dark-page">
        <section id="hero">
          <h1>Welcome</h1>
        </section>
        <section id="features">
          <h2>Features</h2>
        </section>
        <section id="pricing">
          <h2>Pricing</h2>
        </section>
        <section id="cta">
          <h2>Get Started</h2>
        </section>
      </div>

      <button onClick={() => start()}>Start Tour</button>
    </div>
  )
}

export default App
```

```css
/* themes.css */

/* Base dark page styling */
.dark-page {
  background: #0a0a0a;
  min-height: 100vh;
  color: white;
}

.dark-page section {
  padding: 100px 40px;
  border-bottom: 1px solid #222;
}

/* Default theme - light overlay for dark backgrounds */
.theme-default {
  --r-onboarding-overlay-fill: #f0ece4;
  --r-onboarding-overlay-opacity: 0.12;
}

/* Chartreuse accent theme */
.theme-accent {
  --r-onboarding-overlay-fill: #d4ff00;
  --r-onboarding-overlay-opacity: 0.08;
}

.theme-accent .r-onboarding-item {
  border-color: #d4ff00;
}

.theme-accent .r-onboarding-btn-primary {
  background: #d4ff00;
  color: #000;
}

/* Warm orange theme */
.theme-warm {
  --r-onboarding-overlay-fill: #ff6b35;
  --r-onboarding-overlay-opacity: 0.1;
}

.theme-warm .r-onboarding-item {
  border-color: #ff6b35;
}

.theme-warm .r-onboarding-btn-primary {
  background: #ff6b35;
}

/* Cool cyan theme */
.theme-cool {
  --r-onboarding-overlay-fill: #00d4ff;
  --r-onboarding-overlay-opacity: 0.1;
}

.theme-cool .r-onboarding-item {
  border-color: #00d4ff;
}

.theme-cool .r-onboarding-btn-primary {
  background: #00d4ff;
  color: #000;
}

/* Dark tooltip styling */
.r-onboarding-item {
  background: #111 !important;
  border: 1px solid #333 !important;
  color: #f0ece4 !important;
}

.r-onboarding-item__description {
  color: #888 !important;
}

.r-onboarding-btn-secondary {
  border-color: #333 !important;
  color: #f0ece4 !important;
}
```

## CSS Variables Reference

| Variable | Description |
|----------|-------------|
| `--r-onboarding-overlay-fill` | Overlay color |
| `--r-onboarding-overlay-opacity` | Overlay opacity (0-1) |
| `--r-onboarding-step-arrow-background` | Arrow color |

## Key Points

1. **Use CSS classes** - Apply theme classes to a parent element
2. **Switch in hooks** - Use `beforeStep` to change themes
3. **Clean up** - Reset theme on `onFinish` and `onExit`
4. **Consistent styling** - Theme both overlay and tooltip together
