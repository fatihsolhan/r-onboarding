# z-index

There are 2 `z-index` values used in `r-onboarding`:
- Overlay element
- Step element

You can update the `z-index` values by using CSS variables.

::: warning
Make sure the step element's z-index is always greater than the overlay element's z-index.
:::

## Overlay

- **Default:** `10`
- **CSS variable:** `--r-onboarding-overlay-z`

```css
:root {
  --r-onboarding-overlay-z: 30;
}
```

## Step Element

- **Default:** `20`
- **CSS variable:** `--r-onboarding-step-z`

```css
:root {
  --r-onboarding-step-z: 40;
}
```
