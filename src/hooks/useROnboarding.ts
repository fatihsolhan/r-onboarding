import type { ROnboardingWrapperRef } from "@/components/ROnboardingWrapper";
import type { RefObject } from "react";

export default function useROnboarding(wrapperRef: RefObject<ROnboardingWrapperRef | null>) {
  const start = () => wrapperRef?.current?.start()
  const finish = () => wrapperRef?.current?.finish()
  const goToStep = (newStepNumber: number | ((currentStepNumber: number) => number)) => wrapperRef?.current?.goToStep(newStepNumber)

  return {
    start,
    finish,
    goToStep
  }
}
