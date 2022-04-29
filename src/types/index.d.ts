import { ROnboardingStepRenderProps, ROnboardingWrapperOptions } from './ROnboardingWrapper';
import { StepEntity } from './StepEntity';
declare const ROnboardingWrapper: React.ForwardRefExoticComponent<{
  steps: StepEntity[];
  options?: ROnboardingWrapperOptions | undefined;
  children?: React.FC<ROnboardingStepRenderProps> | undefined;
}>

declare const ROnboardingStep: React.ComponentType

declare const useROnboarding: (wrapperRef: any) => {
  start(): void
  finish(): void
  goToStep: (newStepNumber: number | ((currentStepNumber: number) => number)) => void
}

export { ROnboardingWrapper, ROnboardingStep, useROnboarding };

