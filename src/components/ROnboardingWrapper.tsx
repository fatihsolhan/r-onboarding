import ROnboardingStep from "@/components/ROnboardingStep";
import { ROnboardingContext } from '@/contexts/index';
import { defaultROnboardingWrapperOptions, ROnboardingStepRenderProps, ROnboardingWrapperOptions } from "@/types/ROnboardingWrapper";
import { StepEntity } from "@/types/StepEntity";
import merge from 'lodash.merge';
import { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from "react";
const ROnboardingWrapper = forwardRef(({ steps, options, children }: { steps: StepEntity[]; options?: ROnboardingWrapperOptions; children?: React.FC<ROnboardingStepRenderProps> }, ref) => {
  useImperativeHandle(ref, () => ({
    start,
    finish,
    goToStep: setStep,
  }));
  const [index, setIndex] = useState(-1)
  const [activeStep, setActiveStep] = useState<StepEntity | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [mergedOptions, setMergedOptions] = useState<ROnboardingWrapperOptions>({})
  const [isFirstStep, setIsFirstStep] = useState(false)
  const [isLastStep, setIsLastStep] = useState(false)
  useEffect(() => {
    setIsFinished(index >= steps.length || index < 0)
    setIsFirstStep(index === 0)
    setIsLastStep(index === steps.length - 1)
  }, [index])
  const toPreviousStep = () => {
    const newIndex = index - 1
    setStep(newIndex)
  }
  const toNextStep = () => {
    const newIndex = index + 1
    setStep(newIndex)
  }
  const start = () => {
    const newIndex = 0
    setStep(newIndex)
  }
  const finish = () => {
    const newIndex = -1
    setStep(newIndex)
  }
  const setStep = (index: number) => {
    setIndex(index)
    setActiveStep(steps?.[index])
  }
  useEffect(() => {
    setMergedOptions(merge({}, defaultROnboardingWrapperOptions, options))
  }, [])
  if (isFinished) return null;
  return <ROnboardingContext.Provider value={{
    options: mergedOptions,
    step: activeStep,
    nextStep: toNextStep,
    previousStep: toPreviousStep,
    exit: finish,
    isFirstStep,
    isLastStep,
    index
  }}>
    {
      children
        ? <Fragment key={index}>{children({ step: activeStep, next: toNextStep, previous: toPreviousStep, exit: finish, isFirst: isFirstStep, isLast: isLastStep, index })}</Fragment>
        : <ROnboardingStep key={index} />
    }
  </ROnboardingContext.Provider>
})
export default ROnboardingWrapper
