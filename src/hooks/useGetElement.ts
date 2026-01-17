import type { AttachableElement } from "@/types/StepEntity";

function querySelectorDeep(selector: string, root: Document | ShadowRoot | Element = document): Element | null {
  const element = root.querySelector(selector);
  if (element) return element;

  const allElements = root.querySelectorAll('*');
  for (const el of allElements) {
    if (el.shadowRoot) {
      const found = querySelectorDeep(selector, el.shadowRoot);
      if (found) return found;
    }
  }

  return null;
}

export default function useGetElement(element: AttachableElement): Element | null {
  if (typeof element === "string") {
    return document.querySelector(element) ?? querySelectorDeep(element);
  }
  if (typeof element === 'function') {
    return element();
  }
  return null;
}
