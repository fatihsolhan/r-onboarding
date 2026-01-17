import ROnboardingStep from "@/components/ROnboardingStep";
import { ROnboardingContext } from '@/contexts/index';
import { defaultROnboardingWrapperOptions, ROnboardingStepRenderProps, ROnboardingWrapperOptions, StepDirection } from "@/types/ROnboardingWrapper";
import { StepEntity } from "@/types/StepEntity";
import merge from 'lodash.merge';
import { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from "react";

interface ROnboardingWrapperProps {
  steps: StepEntity[];
  options?: ROnboardingWrapperOptions;
  children?: React.FC<ROnboardingStepRenderProps>;
  onFinish?: () => void;
  onExit?: (index: number) => void;
}

const ROnboardingWrapper = forwardRef(({ steps, options, children, onFinish, onExit }: ROnboardingWrapperProps, ref) => {
  const [index, setIndexState] = useState(-1)
  const [activeStep, setActiveStep] = useState<StepEntity | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [mergedOptions, setMergedOptions] = useState<ROnboardingWrapperOptions>({})
  const [isFirstStep, setIsFirstStep] = useState(false)
  const [isLastStep, setIsLastStep] = useState(false)
  const [direction, setDirection] = useState<StepDirection>('forward')
  const isExitingRef = useRef(false)

  useImperativeHandle(ref, () => ({
    start,
    finish: handleFinish,
    goToStep: goToStep,
  }));

  useEffect(() => {
    setIsFinished(index >= steps.length || index < 0)
    setIsFirstStep(index === 0)
    setIsLastStep(index === steps.length - 1)
  }, [index, steps.length])

  const toPreviousStep = () => {
    setDirection('backward')
    const newIndex = index - 1
    goToStep(newIndex)
  }

  const toNextStep = () => {
    setDirection('forward')
    const newIndex = index + 1
    if (newIndex >= steps.length) {
      // Tour is completing normally
      handleFinish()
    } else {
      goToStep(newIndex)
    }
  }

  const start = () => {
    isExitingRef.current = false
    setDirection('forward')
    goToStep(0)
  }

  const handleFinish = () => {
    isExitingRef.current = false
    setIndexState(-1)
    setActiveStep(null)
    onFinish?.()
  }

  const handleExit = () => {
    isExitingRef.current = true
    const currentIndex = index
    setIndexState(-1)
    setActiveStep(null)
    onExit?.(currentIndex)
  }

  const goToStep = (newIndex: number | ((current: number) => number)) => {
    const resolvedIndex = typeof newIndex === 'function' ? newIndex(index) : newIndex
    if (resolvedIndex < 0 || resolvedIndex >= steps.length) {
      return
    }
    setIndexState(resolvedIndex)
    setActiveStep(steps?.[resolvedIndex])
  }

  useEffect(() => {
    setMergedOptions(merge({}, defaultROnboardingWrapperOptions, options))
  }, [options])

  if (isFinished) return null;

  return <div data-r-onboarding-wrapper>
    <ROnboardingContext.Provider value={{
      options: mergedOptions,
      step: activeStep,
      nextStep: toNextStep,
      previousStep: toPreviousStep,
      exit: handleExit,
      isFirstStep,
      isLastStep,
      index,
      direction,
      steps,
    }}>
      {
        children
          ? <Fragment key={index}>{children({ step: activeStep, next: toNextStep, previous: toPreviousStep, exit: handleExit, isFirst: isFirstStep, isLast: isLastStep, index })}</Fragment>
          : <ROnboardingStep key={index} />
      }
    </ROnboardingContext.Provider>
  </div>
})
export default ROnboardingWrapper
