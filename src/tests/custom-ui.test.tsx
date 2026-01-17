import { ROnboardingStep, ROnboardingWrapper } from '@/components/index';
import useROnboarding from '@/hooks/useROnboarding';
import { StepEntity } from '@/types/StepEntity';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useEffect, useRef } from 'react';

const STEP_TITLE_CLASSNAME = 'user-step__title';
const STEP_DESCRIPTION_CLASSNAME = 'user-step__description';
const STEP_WRAPPER_CLASSNAME = 'user-step__wrapper';
const onStepChangeCallback = vi.fn((message: string) => { })

describe('Make sure core functionality works with the custom UI', () => {
  const getStepTitle = (container: HTMLElement) => container.querySelector(`.${STEP_TITLE_CLASSNAME}`)?.textContent ?? '';
  const getStepDescription = (container: HTMLElement) => container.querySelector(`.${STEP_DESCRIPTION_CLASSNAME}`)?.textContent ?? '';
  const steps = [
    {
      attachTo: { element: '#foo' },
      content: { title: "Step 1 Title", description: "Step 1 Description" },
      on: {
        beforeStep: () => {
          onStepChangeCallback('beforeStep 1')
        },
        afterStep: () => {
          onStepChangeCallback('afterStep 1')
        }
      }
    },
    {
      attachTo: { element: '#bar' },
      content: {
        title: "Step 2 Title",
        description: "Step 2 Description"
      },
      on: {
        beforeStep: () => {
          onStepChangeCallback('beforeStep 2')
        },
        afterStep: () => {
          onStepChangeCallback('afterStep 2')
        }
      }
    }
  ] as StepEntity[]

  function Simple() {
    const wrapperRef = useRef(null)
    const { start } = useROnboarding(wrapperRef)
    useEffect(start, [])
    return <ROnboardingWrapper ref={wrapperRef} steps={steps}>
      {({ step, isFirst, isLast, previous, next, exit }) => {
        if (!step) return null
        return <ROnboardingStep>
          <div className="user-step__wrapper">
            <button onClick={exit}>Cancel</button>
            <div className="user-step__title">{step?.content?.title}</div>
            <div className="user-step__description">{step?.content?.description}</div>
            {isFirst ? null : <button onClick={previous}>Previous</button>}
            <button onClick={next}>{isLast ? 'Finish' : 'Next'}</button>
          </div>
        </ROnboardingStep>
      }
      }
    </ROnboardingWrapper>;
  }

  it('should render first step correctly', () => {
    const { container } = render(<Simple />)
    expect(getStepTitle(container)).toBe(steps[0]?.content?.title)
    expect(getStepDescription(container)).toBe(steps[0]?.content?.description)
  })

  it('should move to next step when Next button is clicked', async () => {
    const { container, findByText } = render(<Simple />)
    const nextButton = await findByText('Next')
    fireEvent.click(nextButton)
    expect(getStepTitle(container)).toBe(steps[1]?.content?.title)
    expect(getStepDescription(container)).toBe(steps[1]?.content?.description)
  })

  it('should move to previous step when Previous button is clicked', async () => {
    const { container, findByText } = render(<Simple />)
    const nextButton = await findByText('Next')
    fireEvent.click(nextButton)
    const previousButton = await findByText('Previous')
    fireEvent.click(previousButton)
    expect(getStepTitle(container)).toBe(steps[0]?.content?.title)
    expect(getStepDescription(container)).toBe(steps[0]?.content?.description)
  })

  it('should be finished when Finish button is clicked', async () => {
    const { container, findByText } = render(<Simple />)
    const nextButton = await findByText('Next')
    fireEvent.click(nextButton)
    const finishButton = await findByText('Finish')
    fireEvent.click(finishButton)
    const onboardingItemElement = container.querySelector(`.${STEP_WRAPPER_CLASSNAME}`)
    expect(onboardingItemElement).toBeNull()
  })

  it('should be finished when Cancel button is clicked', async () => {
    const { container, findByText } = render(<Simple />)
    const nextButton = await findByText('Next')
    fireEvent.click(nextButton)
    const cancelButton = await findByText('Cancel')
    fireEvent.click(cancelButton)
    const onboardingItemElement = container.querySelector(`.${STEP_WRAPPER_CLASSNAME}`)
    expect(onboardingItemElement).toBeNull()
  })

  it('should run on.beforeStep for the first step on initial render', async () => {
    onStepChangeCallback.mockClear()
    render(<Simple />)
    expect(onStepChangeCallback).toBeCalledWith('beforeStep 1')
  })

  it('should run on.beforeStep for the next step when Next button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const { findByText } = render(<Simple />)
    const nextButton = await findByText('Next')
    fireEvent.click(nextButton)
    await waitFor(() => {
      expect(onStepChangeCallback).toHaveBeenCalledWith('beforeStep 2')
    })
  })

  it('should run on.afterStep for the previous step when Next button is clicked', async () => {
    onStepChangeCallback.mockClear()
    const { findByText } = render(<Simple />)
    const nextButton = await findByText('Next')
    fireEvent.click(nextButton)
    expect(onStepChangeCallback).toHaveBeenCalledWith('afterStep 1')
  })

  it('should run on.beforeStep for the previous step when Previous button is clicked', async () => {
    const { findByText } = render(<Simple />)
    const nextButton = await findByText('Next')
    fireEvent.click(nextButton)
    onStepChangeCallback.mockClear()
    const previousButton = await findByText('Previous')
    fireEvent.click(previousButton)
    await waitFor(() => {
      expect(onStepChangeCallback).toHaveBeenCalledWith('beforeStep 1')
    })
  })

  it('should run on.afterStep for the current step when Previous button is clicked', async () => {
    const { findByText } = render(<Simple />)
    const nextButton = await findByText('Next')
    fireEvent.click(nextButton)
    onStepChangeCallback.mockClear()
    const previousButton = await findByText('Previous')
    fireEvent.click(previousButton)
    expect(onStepChangeCallback).toHaveBeenCalledWith('afterStep 2')
  })

  it('should run on.afterStep for the last step when Finish button is clicked', async () => {
    const { findByText } = render(<Simple />)
    const nextButton = await findByText('Next')
    fireEvent.click(nextButton)
    onStepChangeCallback.mockClear()
    const finishButton = await findByText('Finish')
    fireEvent.click(finishButton)
    expect(onStepChangeCallback).toHaveBeenCalledWith('afterStep 2')
  })
})
