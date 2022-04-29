import { ROnboardingContextEntity } from '@/types/ROnboardingWrapper';
import { createContext } from 'react';

export const ROnboardingContext = createContext<ROnboardingContextEntity>({} as ROnboardingContextEntity);
