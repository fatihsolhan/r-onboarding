import { ROnboardingWrapper } from '@/components/index';
import useROnboarding from '@/hooks/useROnboarding';
import { StepEntity } from '@/types/StepEntity';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useEffect, useRef } from 'react';

describe('hideButtons option', () => {
  const steps = [
    {
      attachTo: { element: '#foo' },
      content: { title: 'Step 1', description: 'Description 1' },
    },
    {
      attachTo: { element: '#bar' },
      content: { title: 'Step 2', description: 'Description 2' },
    },
    {
      attachTo: { element: '#baz' },
      content: { title: 'Step 3', description: 'Description 3' },
    },
  ] as StepEntity[];

  it('should hide previous button when hideButtons.previous is true', async () => {
    function TestComponent() {
      const wrapperRef = useRef(null);
      const { start } = useROnboarding(wrapperRef);
      useEffect(start, []);
      return (
        <div>
          <div id="foo">Foo</div>
          <div id="bar">Bar</div>
          <div id="baz">Baz</div>
          <ROnboardingWrapper
            ref={wrapperRef}
            steps={steps}
            options={{ hideButtons: { previous: true } }}
          />
        </div>
      );
    }

    const { findByText, queryByText } = render(<TestComponent />);

    // Go to second step where Previous would normally appear
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    // Wait for step to render and check Previous button is hidden
    await waitFor(() => {
      expect(queryByText('Previous')).toBeNull();
    });
  });

  it('should hide next button when hideButtons.next is true', async () => {
    function TestComponent() {
      const wrapperRef = useRef(null);
      const { start } = useROnboarding(wrapperRef);
      useEffect(start, []);
      return (
        <div>
          <div id="foo">Foo</div>
          <div id="bar">Bar</div>
          <div id="baz">Baz</div>
          <ROnboardingWrapper
            ref={wrapperRef}
            steps={steps}
            options={{ hideButtons: { next: true } }}
          />
        </div>
      );
    }

    const { queryByText } = render(<TestComponent />);

    // Wait for step to render
    await waitFor(() => {
      // Next button should not exist on first step
      expect(queryByText('Next')).toBeNull();
    });
  });

  it('should show Finish button even when hideButtons.next is true on last step', async () => {
    function TestComponent() {
      const wrapperRef = useRef(null);
      const { start, goToStep } = useROnboarding(wrapperRef);
      useEffect(() => {
        start();
        // Go directly to last step
        setTimeout(() => goToStep(2), 0);
      }, []);
      return (
        <div>
          <div id="foo">Foo</div>
          <div id="bar">Bar</div>
          <div id="baz">Baz</div>
          <ROnboardingWrapper
            ref={wrapperRef}
            steps={steps}
            options={{ hideButtons: { next: true } }}
          />
        </div>
      );
    }

    const { findByText } = render(<TestComponent />);

    // Finish button should still be visible
    const finishButton = await findByText('Finish');
    expect(finishButton).toBeTruthy();
  });

  it('should hide both buttons when both are set to true', async () => {
    function TestComponent() {
      const wrapperRef = useRef(null);
      const { start } = useROnboarding(wrapperRef);
      useEffect(start, []);
      return (
        <div>
          <div id="foo">Foo</div>
          <div id="bar">Bar</div>
          <div id="baz">Baz</div>
          <ROnboardingWrapper
            ref={wrapperRef}
            steps={steps}
            options={{ hideButtons: { previous: true, next: true } }}
          />
        </div>
      );
    }

    const { queryByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(queryByText('Previous')).toBeNull();
      expect(queryByText('Next')).toBeNull();
    });
  });

  it('should allow step-level hideButtons to override global options', async () => {
    const stepsWithOverride = [
      {
        attachTo: { element: '#foo' },
        content: { title: 'Step 1', description: 'Description 1' },
      },
      {
        attachTo: { element: '#bar' },
        content: { title: 'Step 2', description: 'Description 2' },
        options: { hideButtons: { previous: true } }, // Override at step level
      },
    ] as StepEntity[];

    function TestComponent() {
      const wrapperRef = useRef(null);
      const { start } = useROnboarding(wrapperRef);
      useEffect(start, []);
      return (
        <div>
          <div id="foo">Foo</div>
          <div id="bar">Bar</div>
          <ROnboardingWrapper
            ref={wrapperRef}
            steps={stepsWithOverride}
            options={{ hideButtons: { previous: false } }} // Global: show previous
          />
        </div>
      );
    }

    const { findByText, queryByText } = render(<TestComponent />);

    // Go to second step
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    // Previous should be hidden due to step-level override
    await waitFor(() => {
      expect(queryByText('Previous')).toBeNull();
    });
  });
});
