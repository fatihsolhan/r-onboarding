export default function useROnboarding(wrapperRef: any) {
  const start = () => wrapperRef?.current?.start()
  const finish = () => wrapperRef?.current?.finish()
  const goToStep = (newStepNumber: number | ((currentStepNumber: number) => number)) => wrapperRef?.current?.goToStep(newStepNumber)
  return {
    start,
    finish,
    goToStep
  }
}
