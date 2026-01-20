'use client';

import './css/r-onboarding.sass';

export * from '@/components';
export { default as useROnboarding } from '@/hooks/useROnboarding';
export { Direction, OnboardingState } from '@/types/ROnboardingWrapper';
export type { StepEntity, AttachableElement } from '@/types/StepEntity';
export type {
  ROnboardingWrapperOptions,
  ROnboardingStepRenderProps,
  SvgOverlayOptions,
  onBeforeStepOptions,
  onAfterStepOptions,
  HideButtonsOptions
} from '@/types/ROnboardingWrapper';
