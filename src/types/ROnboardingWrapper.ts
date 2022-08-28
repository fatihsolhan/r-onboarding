import type { createPopper } from "@popperjs/core/lib/createPopper";
import { StepEntity } from "./StepEntity";

export interface SvgOverlayOptions {
  enabled?: boolean
  padding?: number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }
  borderRadius?: number | {
    leftTop?: number;
    rightTop?: number;
    rightBottom?: number;
    leftBottom?: number;
  }
}

export interface ROnboardingWrapperOptions {
  popper?: Parameters<typeof createPopper>[2]
  overlay?: SvgOverlayOptions,
  scrollToStep?: {
    enabled?: boolean
    options?: ScrollIntoViewOptions
  },
  labels?: {
    previousButton?: string
    nextButton?: string
    finishButton?: string
  }
}

export const defaultROnboardingWrapperOptions: ROnboardingWrapperOptions = {
  popper: {},
  overlay: {
    enabled: true,
    padding: 0,
    borderRadius: 0,
  },
  scrollToStep: {
    enabled: true,
    options: {
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    }
  },
  labels: {
    previousButton: 'Previous',
    nextButton: 'Next',
    finishButton: 'Finish'
  }
}

export interface ROnboardingContextEntity {
  options: ROnboardingWrapperOptions
  step: StepEntity | null
  nextStep: () => void
  previousStep: () => void
  exit: () => void
  isFirstStep: boolean
  isLastStep: boolean
  index: number
}

export interface ROnboardingStepRenderProps {
  step: StepEntity | null
  next: () => void
  previous: () => void
  exit: () => void
  isFirst: boolean
  isLast: boolean
  index: number
}
