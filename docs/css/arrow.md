# Arrow

You can control the popover's arrow size and background values by using CSS variables.

::: info
If you are using custom UI for the step elements, you need to add arrow CSS manually. You can see the default arrow CSS at the bottom of this page.
:::

## Background

- **Default:** `white`
- **CSS variable:** `--r-onboarding-step-arrow-background`

```css
:root {
  --r-onboarding-step-arrow-background: #f5f5f5;
}
```

## Size

- **Default:** `10px` (same value for both `width` and `height`)
- **CSS variable:** `--r-onboarding-step-arrow-size`

```css
:root {
  --r-onboarding-step-arrow-size: 14px;
}
```

## Default Arrow CSS

If you're creating a custom UI and want to include the arrow, add this CSS:

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
