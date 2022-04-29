import { ROnboardingWrapperOptions } from "@/types/ROnboardingWrapper";

export type AttachableElement = string | (() => Element | null)

export interface StepEntity {
  content?: {
    title: string;
    description?: string;
  }
  on?: {
    beforeStep?: () => void | Promise<void>
    afterStep?: () => void
  },
  attachTo: {
    element: AttachableElement,
    classList?: string[]
  }
  options?: ROnboardingWrapperOptions
}


