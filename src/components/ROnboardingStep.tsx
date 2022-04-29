import { ROnboardingContext } from "@/contexts";
import useGetElement from "@/hooks/useGetElement";
import useSetClassName from "@/hooks/useSetClassName";
import useSvgOverlay from "@/hooks/useSvgOverlay";
import { createPopper } from "@popperjs/core";
import merge from "lodash.merge";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

export default function ({ children }: { children?: JSX.Element }) {
  const { path, updatePath } = useSvgOverlay()
  const [show, setShow] = useState(false)
  const context = useContext(ROnboardingContext)
  const stepElement = useRef(null)
  const { setTargetElementClassName, unsetTargetElementClassName } = useSetClassName()
  useEffect(() => {
    beforeStepStart()
    return () => {
      beforeStepEnd()
    }
  }, [])
  useLayoutEffect(() => {
    if (!show) return
    attachElement()
  }, [show])
  const onNext = () => {
    beforeStepEnd();
    context.nextStep()
  }
  const onPrevious = () => {
    beforeStepEnd();
    context.previousStep()
  }
  const beforeStepStart = async () => {
    await context.step?.on?.beforeStep?.();
    const element = useGetElement(context.step?.attachTo?.element);
    if (!element || !stepElement.current) return
    setShow(true)
  }
  const attachElement = () => {
    const element = useGetElement(context.step?.attachTo?.element);
    if (!element || !stepElement.current) return
    const mergedOptions = merge({}, context.options, context.step?.options)
    createPopper(element, stepElement.current!, mergedOptions.popper);
    if (mergedOptions?.scrollToStep?.enabled) {
      element.scrollIntoView(mergedOptions?.scrollToStep?.options)
    }
    if (!mergedOptions?.disableOverlay) {
      updatePath(element);
    }
    setTargetElementClassName(element);
  };

  const beforeStepEnd = () => {
    context.step?.on?.afterStep?.();
    unsetTargetElementClassName(useGetElement(context?.step?.attachTo.element), context?.step?.attachTo.classList)
  }
  return (
    <div className={show ? '' : 'hidden'}>
      <svg style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, opacity: '0.5', zIndex: 'var(--r-onboarding-overlay-z, 10)', pointerEvents: 'none' }}>
        <path d={path} />
      </svg>
      <div style={{ position: 'relative', zIndex: 'var(--r-onboarding-step-z, 20)' }}>
        <div ref={stepElement}>
          {context.step ?
            children ||
            <div className="r-onboarding-item">
              <div className="r-onboarding-item__header">
                {context?.step?.content?.title && <span
                  className="r-onboarding-item__header-title"
                >{context.step.content.title}</span>}
                <button onClick={() => context.exit()} className="r-onboarding-item__header-close">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {context?.step?.content?.description && <p
                className="r-onboarding-item__description"
              >{context.step.content.description}</p>}
              <div className="r-onboarding-item__actions">
                {!context.isFirstStep &&
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="r-onboarding-btn-secondary"
                  >Previous</button>
                }
                <button
                  onClick={onNext}
                  type="button"
                  className="r-onboarding-btn-primary"
                >{context.isLastStep ? 'Finish' : 'Next'}</button>
              </div>
            </div>
            : null}
        </div>
      </div>
    </div>
  )
}
