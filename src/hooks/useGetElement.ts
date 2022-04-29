import type { AttachableElement } from "@/types/StepEntity";

export default function useGetElement(element?: AttachableElement | null) {
  if (!element) return null;
  if (typeof element === "string") {
    return document.querySelector(element);
  }
  else if (typeof element === 'function') {
    return element();
  }
  return null;
}
