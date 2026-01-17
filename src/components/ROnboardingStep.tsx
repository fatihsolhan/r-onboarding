import { ROnboardingContext } from "@/contexts";
import useGetElement from "@/hooks/useGetElement";
import useSetClassName from "@/hooks/useSetClassName";
import useSvgOverlay from "@/hooks/useSvgOverlay";
import { defaultROnboardingWrapperOptions, HookOptions, ROnboardingWrapperOptions } from "@/types/ROnboardingWrapper";
import { createPopper } from "@popperjs/core";
import merge from "lodash.merge";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

export default function ({ children }: { children?: JSX.Element }) {
  const { path, updatePath } = useSvgOverlay()
  const [show, setShow] = useState(false)
  const context = useContext(ROnboardingContext)
  const stepElement = useRef(null)
  const { setTargetElementClassName, unsetTargetElementClassName } = useSetClassName()
  const [buttonLabels, setButtonLabels] = useState({
    previous: defaultROnboardingWrapperOptions.labels?.previousButton,
    next: defaultROnboardingWrapperOptions.labels?.nextButton,
    finish: defaultROnboardingWrapperOptions.labels?.finishButton,
  })
  const [mergedOptions, setMergedOptions] = useState<ROnboardingWrapperOptions>({})
  const previousBodyPointerEvents = useRef<string>('')

  useEffect(() => {
    beforeStepStart()
    return () => {
      beforeStepEnd(context.direction)
      restoreBodyPointerEvents()
    }
  }, [])

  useLayoutEffect(() => {
    if (!show) return
    attachElement()
  }, [show])

  const onNext = () => {
    beforeStepEnd('forward');
    context.nextStep()
  }

  const onPrevious = () => {
    beforeStepEnd('backward');
    context.previousStep()
  }

  const onExit = () => {
    beforeStepEnd(context.direction);
    context.exit()
  }

  const getHookOptions = (direction: 'forward' | 'backward' = context.direction): HookOptions => ({
    index: context.index,
    step: context.step!,
    direction,
  })

  const beforeStepStart = async () => {
    if (context.step?.on?.beforeStep) {
      await context.step.on.beforeStep(getHookOptions());
    }
    const element = useGetElement(context.step?.attachTo?.element);
    if (!element || !stepElement.current) return
    setShow(true)
  }

  const attachElement = () => {
    const element = useGetElement(context.step?.attachTo?.element);
    if (!element || !stepElement.current) return
    const options = merge({}, context.options, context.step?.options)
    setMergedOptions(options)
    setButtonLabels({
      previous: options?.labels?.previousButton,
      next: options?.labels?.nextButton,
      finish: options?.labels?.finishButton,
    })
    createPopper(element, stepElement.current!, options.popper);
    if (options?.scrollToStep?.enabled) {
      element.scrollIntoView(options?.scrollToStep?.options)
    }
    if (options?.overlay?.enabled) {
      updatePath(element, {
        padding: options?.overlay?.padding,
        borderRadius: options?.overlay?.borderRadius,
      });
    }
    setTargetElementClassName(element);

    // Handle disableInteraction
    if (options?.disableInteraction) {
      previousBodyPointerEvents.current = document.body.style.pointerEvents
      document.body.style.pointerEvents = 'none'
    }
  };

  const restoreBodyPointerEvents = () => {
    if (document.body.style.pointerEvents === 'none') {
      document.body.style.pointerEvents = previousBodyPointerEvents.current || ''
    }
  }

  const beforeStepEnd = (direction: 'forward' | 'backward' = context.direction) => {
    if (context.step?.on?.afterStep) {
      context.step.on.afterStep(getHookOptions(direction));
    }
    unsetTargetElementClassName(useGetElement(context?.step?.attachTo.element), context?.step?.attachTo.classList)
    restoreBodyPointerEvents()
  }

  const shouldShowPreviousButton = () => {
    if (context.isFirstStep) return false
    if (mergedOptions?.hideButtons?.previous) return false
    return true
  }

  const shouldShowNextButton = () => {
    if (context.isLastStep) return true // Always show finish button
    if (mergedOptions?.hideButtons?.next) return false
    return true
  }

  const renderTitle = () => {
    if (!context?.step?.content?.title) return null
    if (context.step.content.html) {
      return (
        <span
          className="r-onboarding-item__header-title"
          dangerouslySetInnerHTML={{ __html: context.step.content.title }}
        />
      )
    }
    return (
      <span className="r-onboarding-item__header-title">
        {context.step.content.title}
      </span>
    )
  }

  const renderDescription = () => {
    if (!context?.step?.content?.description) return null
    if (context.step.content.html) {
      return (
        <p
          className="r-onboarding-item__description"
          dangerouslySetInnerHTML={{ __html: context.step.content.description }}
        />
      )
    }
    return (
      <p className="r-onboarding-item__description">
        {context.step.content.description}
      </p>
    )
  }

  return (
    <div className={show ? '' : 'hidden'}>
      <svg style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, opacity: '0.5', zIndex: 'var(--r-onboarding-overlay-z, 10)', pointerEvents: 'none' }}>
        <path d={path} />
      </svg>
      <div style={{ position: 'relative', zIndex: 'var(--r-onboarding-step-z, 20)', pointerEvents: 'auto' }}>
        <div ref={stepElement}>
          {context.step ?
            children ||
            <div className="r-onboarding-item">
              <div className="r-onboarding-item__header">
                {renderTitle()}
                <button onClick={onExit} className="r-onboarding-item__header-close">
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
              {renderDescription()}
              <div className="r-onboarding-item__actions">
                {shouldShowPreviousButton() &&
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="r-onboarding-btn-secondary"
                  >{buttonLabels.previous}</button>
                }
                {shouldShowNextButton() &&
                  <button
                    onClick={onNext}
                    type="button"
                    className="r-onboarding-btn-primary"
                  >{context.isLastStep ? buttonLabels.finish : buttonLabels.next}</button>
                }
              </div>
            </div>
            : null}
          <div data-popper-arrow />
        </div>
      </div>
    </div>
  )
}
