import { ROnboardingContext } from "@/contexts";
import useGetElement from "@/hooks/useGetElement";
import useSvgOverlay from "@/hooks/useSvgOverlay";
import { defaultROnboardingWrapperOptions, ROnboardingWrapperOptions } from "@/types/ROnboardingWrapper";
import { createPopper, Instance as PopperInstance } from "@popperjs/core";
import merge from "lodash.merge";
import { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState, ReactNode } from "react";

export interface ROnboardingStepProps {
  children?: ReactNode;
}

const waitForScrollEnd = (element: Element, callback: () => void) => {
  let lastTop = element.getBoundingClientRect().top
  let stableFrames = 0
  let rafId: number
  let timeoutId: ReturnType<typeof setTimeout>

  const check = () => {
    const currentTop = element.getBoundingClientRect().top
    if (Math.abs(currentTop - lastTop) < 1) {
      if (++stableFrames >= 3) {
        clearTimeout(timeoutId)
        callback()
        return
      }
    } else {
      stableFrames = 0
    }
    lastTop = currentTop
    rafId = requestAnimationFrame(check)
  }

  rafId = requestAnimationFrame(check)
  timeoutId = setTimeout(() => {
    cancelAnimationFrame(rafId)
    callback()
  }, 1000)
}

export default function ROnboardingStep({ children }: ROnboardingStepProps) {
  const { path, updatePath } = useSvgOverlay()
  const [show, setShow] = useState(false)
  const [ready, setReady] = useState(false)
  const context = useContext(ROnboardingContext)
  const stepElement = useRef<HTMLDivElement>(null)
  const popperInstance = useRef<PopperInstance | null>(null)

  const mergedOptions = useMemo(() => {
    return merge({}, context.options, context.step?.options) as ROnboardingWrapperOptions
  }, [context.options, context.step?.options])

  const buttonLabels = useMemo(() => ({
    previous: mergedOptions?.labels?.previousButton ?? defaultROnboardingWrapperOptions.labels?.previousButton,
    next: mergedOptions?.labels?.nextButton ?? defaultROnboardingWrapperOptions.labels?.nextButton,
    finish: mergedOptions?.labels?.finishButton ?? defaultROnboardingWrapperOptions.labels?.finishButton,
  }), [mergedOptions])

  const updatePositions = useCallback((element: Element) => {
    popperInstance.current?.update()
    if (mergedOptions?.overlay?.enabled) {
      updatePath(element, {
        padding: mergedOptions?.overlay?.padding,
        borderRadius: mergedOptions?.overlay?.borderRadius,
      })
    }
  }, [mergedOptions, updatePath])

  const attachElement = useCallback(async () => {
    if (!context.step) return

    await new Promise(resolve => requestAnimationFrame(resolve))

    const element = useGetElement(context.step.attachTo?.element)
    if (!element || !stepElement.current) return

    popperInstance.current?.destroy()
    popperInstance.current = null

    const initPopper = async () => {
      setReady(false)
      setShow(true)

      await new Promise(resolve => requestAnimationFrame(resolve))

      if (!stepElement.current) return

      popperInstance.current = createPopper(element, stepElement.current, mergedOptions.popper)
      await popperInstance.current.update()
      updatePositions(element)
      setReady(true)
    }

    const scrollOptions = mergedOptions?.scrollToStep
    if (scrollOptions?.enabled) {
      setShow(false)
      setReady(false)

      await new Promise(resolve => requestAnimationFrame(resolve))

      element.scrollIntoView?.(scrollOptions.options)

      if (scrollOptions.options?.behavior === 'smooth') {
        waitForScrollEnd(element, initPopper)
      } else {
        initPopper()
      }
    } else {
      initPopper()
    }
  }, [context.step, mergedOptions, updatePositions])

  useLayoutEffect(() => {
    attachElement()

    return () => {
      popperInstance.current?.destroy()
      popperInstance.current = null
    }
  }, [context.step])

  const isButtonVisible = useMemo(() => ({
    previous: !mergedOptions?.hideButtons?.previous,
    next: !mergedOptions?.hideButtons?.next,
    exit: !mergedOptions?.hideButtons?.exit
  }), [mergedOptions])

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

  if (!context.step) return null

  return (
    <div style={{ display: show ? 'block' : 'none', visibility: ready ? 'visible' : 'hidden' }}>
      <svg style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        fill: 'var(--r-onboarding-overlay-fill, black)',
        opacity: 'var(--r-onboarding-overlay-opacity, 0.5)',
        zIndex: 'var(--r-onboarding-overlay-z, 10)',
        pointerEvents: 'none'
      }}>
        <path d={path} />
      </svg>
      <div ref={stepElement} style={{ position: 'relative', zIndex: 'var(--r-onboarding-step-z, 20)' }}>
        {children || (
          <div className="r-onboarding-item">
            <div className="r-onboarding-item__header">
              {renderTitle()}
              {isButtonVisible.exit && (
                <button onClick={context.exit} aria-label="Close" className="r-onboarding-item__header-close">
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
              )}
            </div>
            {renderDescription()}
            <div className="r-onboarding-item__actions">
              {!context.isFirstStep && isButtonVisible.previous && (
                <button
                  type="button"
                  onClick={context.previous}
                  className="r-onboarding-btn-secondary"
                >{buttonLabels.previous}</button>
              )}
              {(context.isLastStep || isButtonVisible.next) && (
                <button
                  onClick={context.isLastStep ? context.finish : context.next}
                  type="button"
                  className="r-onboarding-btn-primary"
                >{context.isLastStep ? buttonLabels.finish : buttonLabels.next}</button>
              )}
            </div>
          </div>
        )}
        <div data-popper-arrow />
      </div>
    </div>
  )
}
