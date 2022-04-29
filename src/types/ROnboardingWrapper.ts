import type { createPopper } from "@popperjs/core/lib/createPopper";
import { StepEntity } from "./StepEntity";

export interface ROnboardingWrapperOptions {
  popper?: Parameters<typeof createPopper>[2]
  disableOverlay?: boolean
  scrollToStep?: {
    enabled?: boolean
    options?: ScrollIntoViewOptions
  }
}

export const defaultROnboardingWrapperOptions: ROnboardingWrapperOptions = {
  popper: {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      }
    ]
  } as ROnboardingWrapperOptions["popper"],
  disableOverlay: false,
  scrollToStep: {
    enabled: true,
    options: {
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    }
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
