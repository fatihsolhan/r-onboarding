import type { AttachableElement } from "@/types/StepEntity";

function querySelectorDeep(selector: string, root: Document | ShadowRoot | Element = document): Element | null {
  const element = root.querySelector(selector)
  if (element) return element

  const allElements = root.querySelectorAll('*')
  for (const el of allElements) {
    if (el.shadowRoot) {
      const found = querySelectorDeep(selector, el.shadowRoot)
      if (found) return found
    }
  }

  return null
}

function isRef(value: unknown): value is { current: unknown } {
  return value !== null && typeof value === 'object' && 'current' in value
}

export default function useGetElement(element: AttachableElement): Element | null {
  if (isRef(element)) {
    const current = element.current
    if (current instanceof Element) {
      return current
    }
    return null
  }

  if (typeof element === "string") {
    const found = document.querySelector(element)
    if (found) return found
    return querySelectorDeep(element)
  }

  if (typeof element === 'function') {
    return element()
  }

  return null
}
