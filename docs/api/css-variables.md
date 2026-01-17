# CSS Variables

Customize r-onboarding appearance using CSS custom properties.

## Overlay Variables

### `--r-onboarding-overlay-fill`

The color of the overlay background.

```css
:root {
  --r-onboarding-overlay-fill: black;  /* Default */
}

/* Light overlay for dark backgrounds */
.dark-theme {
  --r-onboarding-overlay-fill: white;
}

/* Colored overlay */
.accent-theme {
  --r-onboarding-overlay-fill: #d4ff00;
}
```

### `--r-onboarding-overlay-opacity`

Opacity of the overlay (0 to 1).

```css
:root {
  --r-onboarding-overlay-opacity: 0.5;  /* Default */
}

/* Subtle overlay */
.subtle {
  --r-onboarding-overlay-opacity: 0.2;
}

/* Strong overlay */
.strong {
  --r-onboarding-overlay-opacity: 0.8;
}
```

## Arrow Variables

### `--r-onboarding-step-arrow-background`

Background color of the tooltip arrow.

```css
:root {
  --r-onboarding-step-arrow-background: white;  /* Default */
}

/* Dark tooltip */
.dark-tooltip {
  --r-onboarding-step-arrow-background: #1a1a1a;
}
```

### `--r-onboarding-step-arrow-size`

Size of the tooltip arrow.

```css
:root {
  --r-onboarding-step-arrow-size: 10px;  /* Default */
}

/* Larger arrow */
.large-arrow {
  --r-onboarding-step-arrow-size: 14px;
}
```

## Z-Index Variables

### `--r-onboarding-step-z`

Z-index of the step tooltip.

```css
:root {
  --r-onboarding-step-z: 20;  /* Default */
}

/* Higher z-index for modals */
.above-modals {
  --r-onboarding-step-z: 10000;
}
```

## Theme Examples

### Dark Theme

```css
.dark-onboarding {
  --r-onboarding-overlay-fill: white;
  --r-onboarding-overlay-opacity: 0.1;
  --r-onboarding-step-arrow-background: #1a1a1a;
}
```

### Colorful Theme

```css
.colorful-onboarding {
  --r-onboarding-overlay-fill: #6366f1;
  --r-onboarding-overlay-opacity: 0.15;
  --r-onboarding-step-arrow-background: #6366f1;
}
```

### Minimal Theme

```css
.minimal-onboarding {
  --r-onboarding-overlay-fill: black;
  --r-onboarding-overlay-opacity: 0.3;
  --r-onboarding-step-arrow-size: 8px;
}
```

## Dynamic Theming

Change themes per-step using lifecycle hooks:

```tsx
const themes = ['default', 'accent', 'warm', 'cool']

const steps = [
  {
    attachTo: { element: '#step-1' },
    on: {
      beforeStep: () => {
        document.body.className = 'theme-default'
      }
    }
  },
  {
    attachTo: { element: '#step-2' },
    on: {
      beforeStep: () => {
        document.body.className = 'theme-accent'
      }
    }
  }
]
```

```css
.theme-default {
  --r-onboarding-overlay-fill: black;
  --r-onboarding-overlay-opacity: 0.5;
}

.theme-accent {
  --r-onboarding-overlay-fill: #d4ff00;
  --r-onboarding-overlay-opacity: 0.08;
}

.theme-warm {
  --r-onboarding-overlay-fill: #ff6b35;
  --r-onboarding-overlay-opacity: 0.1;
}

.theme-cool {
  --r-onboarding-overlay-fill: #00d4ff;
  --r-onboarding-overlay-opacity: 0.1;
}
```
