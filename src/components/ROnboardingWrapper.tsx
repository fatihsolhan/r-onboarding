import ROnboardingStep from "@/components/ROnboardingStep";
import { ROnboardingContext } from '@/contexts/index';
import useGetElement from "@/hooks/useGetElement";
import {
  defaultROnboardingWrapperOptions,
  ROnboardingStepRenderProps,
  ROnboardingWrapperOptions,
  Direction,
  OnboardingState,
  onBeforeStepOptions,
  onAfterStepOptions
} from "@/types/ROnboardingWrapper";
import { StepEntity } from "@/types/StepEntity";
import merge from 'lodash.merge';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

export interface ROnboardingWrapperProps {
  steps: StepEntity[];
  options?: ROnboardingWrapperOptions;
  children?: React.FC<ROnboardingStepRenderProps>;
  onFinish?: () => void;
  onExit?: (index: number) => void;
}

export interface ROnboardingWrapperRef {
  start: () => void;
  finish: () => void;
  goToStep: (newStepNumber: number | ((currentStepNumber: number) => number)) => void;
}

const POINTER_ATTR = 'data-r-onboarding-pointer-events'

const blockInteraction = (element: HTMLElement | null) => {
  if (!element) return
  if (element.style.pointerEvents === 'none') return
  const current = element.style.pointerEvents
  if (current) element.setAttribute(POINTER_ATTR, current)
  element.style.pointerEvents = 'none'
}

const allowInteraction = (element: HTMLElement | null) => {
  if (!element) return
  if (element.style.pointerEvents === 'auto') return
  const current = element.style.pointerEvents
  if (current) element.setAttribute(POINTER_ATTR, current)
  element.style.pointerEvents = 'auto'
}

const restoreInteraction = (element: HTMLElement | null) => {
  if (!element) return
  const stored = element.getAttribute(POINTER_ATTR)
  if (stored) {
    element.style.pointerEvents = stored
    element.removeAttribute(POINTER_ATTR)
  } else {
    element.style.removeProperty('pointer-events')
  }
}

const ROnboardingWrapper = forwardRef<ROnboardingWrapperRef, ROnboardingWrapperProps>(({ steps, options, children, onFinish, onExit }, ref) => {
  const [currentIndex, setCurrentIndex] = useState<number>(OnboardingState.IDLE)
  const [showStep, setShowStep] = useState(true)
  const indexRef = useRef<number>(currentIndex)

  useEffect(() => {
    indexRef.current = currentIndex
  }, [currentIndex])

  const mergedOptions = useMemo(() => merge({}, defaultROnboardingWrapperOptions, options), [options])
  const currentStep = steps?.[currentIndex] ?? null
  const isActive = currentIndex >= 0 && currentIndex < steps.length
  const isFirstStep = currentIndex === 0
  const isLastStep = currentIndex === steps.length - 1

  const getStepOptions = (step?: StepEntity) => {
    return step ? merge({}, mergedOptions, step.options) : mergedOptions
  }

  const runSetup = (step: StepEntity, index: number, direction: number) => {
    const element = useGetElement(step.attachTo.element) as HTMLElement
    const options = getStepOptions(step)

    if (step.attachTo.classList?.length) {
      element?.classList.add(...step.attachTo.classList)
    }

    if (options?.overlay?.preventOverlayInteraction) {
      blockInteraction(document.body)
      allowInteraction(element)
    }

    return step.on?.beforeStep?.({
      index,
      step,
      direction,
      isForward: direction === Direction.FORWARD,
      isBackward: direction === Direction.BACKWARD,
    } as onBeforeStepOptions)
  }

  const runCleanup = (step: StepEntity, index: number, direction: number) => {
    const element = useGetElement(step.attachTo.element) as HTMLElement
    const options = getStepOptions(step)

    if (step.attachTo.classList?.length) {
      element?.classList.remove(...step.attachTo.classList)
    }

    if (options?.overlay?.preventOverlayInteraction) {
      restoreInteraction(element)
      restoreInteraction(document.body)
    }

    return step.on?.afterStep?.({
      index,
      step,
      direction,
      isForward: direction === Direction.FORWARD,
      isBackward: direction === Direction.BACKWARD,
    } as onAfterStepOptions)
  }

  const goToStep = (target: number | ((current: number) => number)) => {
    const newIndex = typeof target === 'function' ? target(indexRef.current) : target
    const oldIndex = indexRef.current

    if (newIndex === oldIndex) return

    const direction = newIndex > oldIndex ? Direction.FORWARD : Direction.BACKWARD
    const oldStep = steps[oldIndex]
    const newStep = steps[newIndex]

    if (getStepOptions(newStep)?.hideNextStepDuringHook) {
      setShowStep(false)
    }

    setCurrentIndex(newIndex)

    ;(async () => {
      if (oldStep) await runCleanup(oldStep, oldIndex, direction)
      if (newStep) await runSetup(newStep, newIndex, direction)
      setShowStep(true)
    })()
  }

  const start = () => goToStep(0)

  const finish = () => {
    const step = steps[indexRef.current]
    const index = indexRef.current

    setCurrentIndex(OnboardingState.FINISHED)
    restoreInteraction(document.body)
    onFinish?.()

    if (step) runCleanup(step, index, Direction.FORWARD)
  }

  const exit = () => {
    const step = steps[indexRef.current]
    const index = indexRef.current

    setCurrentIndex(OnboardingState.FINISHED)
    restoreInteraction(document.body)
    onExit?.(index)

    if (step) runCleanup(step, index, Direction.FORWARD)
  }

  const previous = () => goToStep(i => i - 1)

  const next = () => {
    if (isLastStep) {
      finish()
    } else {
      goToStep(i => i + 1)
    }
  }

  useImperativeHandle(ref, () => ({
    start,
    finish,
    goToStep,
  }))

  if (!isActive) return <div data-r-onboarding-wrapper style={{ display: 'none' }} />;

  return (
    <div data-r-onboarding-wrapper style={{ pointerEvents: 'auto' }}>
      <ROnboardingContext.Provider value={{
        step: currentStep,
        options: mergedOptions,
        next,
        previous,
        finish,
        exit,
        isFirstStep,
        isLastStep,
      }}>
        {showStep && (
          children
            ? <>{children({ step: currentStep, next, previous, exit, isFirst: isFirstStep, isLast: isLastStep, index: currentIndex })}</>
            : <ROnboardingStep />
        )}
      </ROnboardingContext.Provider>
    </div>
  )
})

export default ROnboardingWrapper
