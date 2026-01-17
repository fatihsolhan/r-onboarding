# CSS Variables

Customize the appearance of r-onboarding using CSS variables.

## Overlay Variables

### `--r-onboarding-overlay-z`

- **Default:** `10`
- **Description:** Z-index of the overlay background

```css
:root {
  --r-onboarding-overlay-z: 30;
}
```

## Arrow Variables

### `--r-onboarding-step-arrow-background`

- **Default:** `white`
- **Description:** Background color of the tooltip arrow

```css
:root {
  --r-onboarding-step-arrow-background: #f5f5f5;
}
```

### `--r-onboarding-step-arrow-size`

- **Default:** `10px`
- **Description:** Size of the tooltip arrow

```css
:root {
  --r-onboarding-step-arrow-size: 12px;
}
```

## Z-Index Variables

### `--r-onboarding-step-z`

- **Default:** `20`
- **Description:** Z-index of the step tooltip

```css
:root {
  --r-onboarding-step-z: 40;
}
```

::: warning
Make sure the step element's z-index is always greater than the overlay element's z-index.
:::

## Complete Example

```css
:root {
  /* Overlay */
  --r-onboarding-overlay-z: 100;

  /* Step tooltip */
  --r-onboarding-step-z: 110;

  /* Arrow */
  --r-onboarding-step-arrow-size: 12px;
  --r-onboarding-step-arrow-background: #ffffff;
}
```

## Arrow CSS for Custom UI

If you're using custom UI and want to include the tooltip arrow, add this CSS:

```css
[data-r-onboarding-wrapper] [data-popper-arrow]::before {
  content: '';
  background: var(--r-onboarding-step-arrow-background, white);
  top: 0;
  left: 0;
  transition: transform 0.2s ease-out, visibility 0.2s ease-out;
  visibility: visible;
  transform: translateX(0px) rotate(45deg);
  transform-origin: center;
  width: var(--r-onboarding-step-arrow-size, 10px);
  height: var(--r-onboarding-step-arrow-size, 10px);
  position: absolute;
  z-index: -1;
}

[data-r-onboarding-wrapper] [data-popper-placement^='top'] > [data-popper-arrow] {
  bottom: 5px;
}

[data-r-onboarding-wrapper] [data-popper-placement^='right'] > [data-popper-arrow] {
  left: -4px;
}

[data-r-onboarding-wrapper] [data-popper-placement^='bottom'] > [data-popper-arrow] {
  top: -4px;
}

[data-r-onboarding-wrapper] [data-popper-placement^='left'] > [data-popper-arrow] {
  right: -4px;
}
```
