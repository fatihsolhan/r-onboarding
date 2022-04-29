
export default function useSetClassName() {
  const setTargetElementClassName = (element?: Element | null, classList?: string[]) => {
    if (!classList || !element) return;
    element.classList.add(...classList)
  }
  const unsetTargetElementClassName = (element?: Element | null, classList?: string[]) => {
    if (!classList || !element) return;
    element.classList.remove(...classList)
  }
  return {
    setTargetElementClassName,
    unsetTargetElementClassName
  }
}
