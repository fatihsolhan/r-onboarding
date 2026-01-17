import { HookOptions, ROnboardingWrapperOptions } from "@/types/ROnboardingWrapper";

export type AttachableElement = string | (() => Element | null)

export interface StepEntity {
  content?: {
    title: string;
    description?: string;
    html?: boolean;
  }
  on?: {
    beforeStep?: (options?: HookOptions) => void | Promise<void>
    afterStep?: (options?: HookOptions) => void
  },
  attachTo: {
    element: AttachableElement,
    classList?: string[]
  }
  options?: ROnboardingWrapperOptions
}


