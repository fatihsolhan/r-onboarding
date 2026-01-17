import { ROnboardingWrapper } from '@/components/index';
import useROnboarding from '@/hooks/useROnboarding';
import { StepEntity } from '@/types/StepEntity';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useEffect, useRef } from 'react';

describe('Enhanced lifecycle hooks with direction parameter', () => {
  it('should pass index, step, and direction to beforeStep hook', async () => {
    const beforeStepCallback = vi.fn();

    const steps = [
      {
        attachTo: { element: '#foo' },
        content: { title: 'Step 1', description: 'Description 1' },
        on: {
          beforeStep: beforeStepCallback,
        },
      },
      {
        attachTo: { element: '#bar' },
        content: { title: 'Step 2', description: 'Description 2' },
        on: {
          beforeStep: beforeStepCallback,
        },
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
          <ROnboardingWrapper ref={wrapperRef} steps={steps} />
        </div>
      );
    }

    const { findByText } = render(<TestComponent />);

    // Wait for first step to render
    await waitFor(() => {
      expect(beforeStepCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 0,
          direction: 1, // Direction.FORWARD
          isForward: true,
        })
      );
    });

    beforeStepCallback.mockClear();

    // Navigate to next step
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    // Second beforeStep should be called with index 1 and forward direction
    await waitFor(() => {
      expect(beforeStepCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 1,
          direction: 1, // Direction.FORWARD
          isForward: true,
        })
      );
    });
  });

  it('should pass backward direction when navigating to previous step', async () => {
    const beforeStepCallback = vi.fn();

    const steps = [
      {
        attachTo: { element: '#foo' },
        content: { title: 'Step 1', description: 'Description 1' },
        on: {
          beforeStep: beforeStepCallback,
        },
      },
      {
        attachTo: { element: '#bar' },
        content: { title: 'Step 2', description: 'Description 2' },
        on: {
          beforeStep: beforeStepCallback,
        },
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
          <ROnboardingWrapper ref={wrapperRef} steps={steps} />
        </div>
      );
    }

    const { findByText } = render(<TestComponent />);

    // Navigate to next step
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    beforeStepCallback.mockClear();

    // Navigate back
    const previousButton = await findByText('Previous');
    await act(async () => {
      fireEvent.click(previousButton);
    });

    // beforeStep should be called with backward direction
    await waitFor(() => {
      expect(beforeStepCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 0,
          direction: -1, // Direction.BACKWARD
          isBackward: true,
        })
      );
    });
  });

  it('should pass index, step, and direction to afterStep hook', async () => {
    const afterStepCallback = vi.fn();

    const steps = [
      {
        attachTo: { element: '#foo' },
        content: { title: 'Step 1', description: 'Description 1' },
        on: {
          afterStep: afterStepCallback,
        },
      },
      {
        attachTo: { element: '#bar' },
        content: { title: 'Step 2', description: 'Description 2' },
        on: {
          afterStep: afterStepCallback,
        },
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
          <ROnboardingWrapper ref={wrapperRef} steps={steps} />
        </div>
      );
    }

    const { findByText } = render(<TestComponent />);

    // Navigate to next step
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    // afterStep should be called with index 0 and forward direction
    await waitFor(() => {
      expect(afterStepCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 0,
          direction: 1, // Direction.FORWARD
          isForward: true,
        })
      );
    });
  });

  it('should pass backward direction to afterStep when navigating back', async () => {
    const afterStepCallback = vi.fn();

    const steps = [
      {
        attachTo: { element: '#foo' },
        content: { title: 'Step 1', description: 'Description 1' },
        on: {
          afterStep: afterStepCallback,
        },
      },
      {
        attachTo: { element: '#bar' },
        content: { title: 'Step 2', description: 'Description 2' },
        on: {
          afterStep: afterStepCallback,
        },
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
          <ROnboardingWrapper ref={wrapperRef} steps={steps} />
        </div>
      );
    }

    const { findByText } = render(<TestComponent />);

    // Navigate to next step
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    afterStepCallback.mockClear();

    // Navigate back
    const previousButton = await findByText('Previous');
    await act(async () => {
      fireEvent.click(previousButton);
    });

    // afterStep should be called with backward direction for step 2
    await waitFor(() => {
      expect(afterStepCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 1,
          direction: -1, // Direction.BACKWARD
          isBackward: true,
        })
      );
    });
  });
});
