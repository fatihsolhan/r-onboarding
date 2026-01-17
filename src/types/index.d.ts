import * as React from 'react';
import { ROnboardingStepRenderProps, ROnboardingWrapperOptions, SvgOverlayOptions, onBeforeStepOptions, onAfterStepOptions, Direction, OnboardingState } from './ROnboardingWrapper';
import { StepEntity, AttachableElement } from './StepEntity';

interface ROnboardingWrapperRef {
  start(): void;
  finish(): void;
  goToStep(newStepNumber: number | ((currentStepNumber: number) => number)): void;
}

declare const ROnboardingWrapper: React.ForwardRefExoticComponent<
  {
    steps: StepEntity[];
    options?: ROnboardingWrapperOptions | undefined;
    children?: React.FC<ROnboardingStepRenderProps> | undefined;
    onFinish?: () => void;
    onExit?: (index: number) => void;
  } & React.RefAttributes<ROnboardingWrapperRef>
>

declare const ROnboardingStep: React.FC<{
  children?: React.ReactNode;
}>

declare const useROnboarding: (wrapperRef: React.RefObject<ROnboardingWrapperRef | null>) => {
  start(): void
  finish(): void
  goToStep: (newStepNumber: number | ((currentStepNumber: number) => number)) => void
}

export {
  ROnboardingWrapper,
  ROnboardingStep,
  useROnboarding,
  ROnboardingWrapperOptions,
  ROnboardingWrapperRef,
  ROnboardingStepRenderProps,
  SvgOverlayOptions,
  StepEntity,
  AttachableElement,
  onBeforeStepOptions,
  onAfterStepOptions,
  Direction,
  OnboardingState
};
