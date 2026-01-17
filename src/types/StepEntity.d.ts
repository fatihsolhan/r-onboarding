import { onBeforeStepOptions, onAfterStepOptions, ROnboardingWrapperOptions } from "@/types/ROnboardingWrapper";

export type AttachableElement = string | (() => Element | null)

export interface StepEntity {
  content: {
    title: string;
    description?: string;
    html?: boolean;
  }
  on?: {
    beforeStep?: (options?: onBeforeStepOptions) => void | Promise<void>
    afterStep?: (options?: onAfterStepOptions) => void | Promise<void>
  },
  attachTo: {
    element: AttachableElement,
    classList?: string[]
  }
  options?: ROnboardingWrapperOptions
}
