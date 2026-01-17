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
  preventOverlayInteraction?: boolean
}

export interface HideButtonsOptions {
  previous?: boolean
  next?: boolean
  exit?: boolean
}

export const Direction = {
  BACKWARD: -1,
  FORWARD: 1
} as const;

export type DirectionType = typeof Direction[keyof typeof Direction];

export const OnboardingState = {
  IDLE: -1,
  FINISHED: -2
} as const;

export interface onGlobalOptions {
  index: number
  step: StepEntity
  direction: 1 | -1 | number
  isForward: boolean
  isBackward: boolean
}

export type onBeforeStepOptions = onGlobalOptions

export type onAfterStepOptions = onGlobalOptions

export type HookOptions = onBeforeStepOptions;

export interface ROnboardingWrapperOptions {
  popper?: Parameters<typeof createPopper>[2]
  overlay?: SvgOverlayOptions,
  scrollToStep?: {
    enabled?: boolean
    options?: ScrollIntoViewOptions
  },
  autoFinishByExit?: boolean,
  hideButtons?: HideButtonsOptions,
  labels?: {
    previousButton?: string
    nextButton?: string
    finishButton?: string
  },
  hideNextStepDuringHook?: boolean
}

export const defaultROnboardingWrapperOptions: ROnboardingWrapperOptions = {
  popper: {
    modifiers: [
      {
        name: 'arrow',
        options: {
          padding: 8,
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom', 'right', 'left'],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'viewport',
          padding: 8,
          tether: false,
          altAxis: true,
        },
      },
    ],
  },
  overlay: {
    enabled: true,
    padding: 0,
    borderRadius: 0,
    preventOverlayInteraction: true
  },
  scrollToStep: {
    enabled: true,
    options: {
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    }
  },
  autoFinishByExit: true,
  labels: {
    previousButton: 'Previous',
    nextButton: 'Next',
    finishButton: 'Finish'
  },
  hideButtons: {
    previous: false,
    next: false,
    exit: false
  },
  hideNextStepDuringHook: false
}

export interface ROnboardingContextEntity {
  step: StepEntity | null
  options: ROnboardingWrapperOptions
  next: () => void
  previous: () => void
  finish: () => void
  exit: () => void
  isFirstStep: boolean
  isLastStep: boolean
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
