import { ROnboardingWrapper } from '@/components/index';
import useROnboarding from '@/hooks/useROnboarding';
import { StepEntity } from '@/types/StepEntity';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useEffect, useRef } from 'react';

describe('Events: onFinish and onExit callbacks', () => {
  const steps = [
    {
      attachTo: { element: '#foo' },
      content: { title: 'Step 1', description: 'Description 1' },
    },
    {
      attachTo: { element: '#bar' },
      content: { title: 'Step 2', description: 'Description 2' },
    },
  ] as StepEntity[];

  it('should call onFinish when tour completes by clicking Finish button', async () => {
    const onFinish = vi.fn();

    function TestComponent() {
      const wrapperRef = useRef(null);
      const { start } = useROnboarding(wrapperRef);
      useEffect(start, []);
      return (
        <div>
          <div id="foo">Foo</div>
          <div id="bar">Bar</div>
          <ROnboardingWrapper ref={wrapperRef} steps={steps} onFinish={onFinish} />
        </div>
      );
    }

    const { findByText } = render(<TestComponent />);

    // Navigate to last step
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    // Click finish
    const finishButton = await findByText('Finish');
    await act(async () => {
      fireEvent.click(finishButton);
    });

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onExit with current index when user exits early', async () => {
    const onExit = vi.fn();

    function TestComponent() {
      const wrapperRef = useRef(null);
      const { start } = useROnboarding(wrapperRef);
      useEffect(start, []);
      return (
        <div>
          <div id="foo">Foo</div>
          <div id="bar">Bar</div>
          <ROnboardingWrapper ref={wrapperRef} steps={steps} onExit={onExit} />
        </div>
      );
    }

    const { container, findByText } = render(<TestComponent />);

    // Navigate to second step
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    // Click close/exit button
    await waitFor(() => {
      const closeButton = container.querySelector('.r-onboarding-item__header-close');
      expect(closeButton).toBeTruthy();
    });

    const closeButton = container.querySelector('.r-onboarding-item__header-close');
    await act(async () => {
      fireEvent.click(closeButton!);
    });

    await waitFor(() => {
      expect(onExit).toHaveBeenCalledTimes(1);
      expect(onExit).toHaveBeenCalledWith(1);
    });
  });

  it('should call onExit when exit is called from first step', async () => {
    const onExit = vi.fn();

    function TestComponent() {
      const wrapperRef = useRef(null);
      const { start } = useROnboarding(wrapperRef);
      useEffect(start, []);
      return (
        <div>
          <div id="foo">Foo</div>
          <div id="bar">Bar</div>
          <ROnboardingWrapper ref={wrapperRef} steps={steps} onExit={onExit} />
        </div>
      );
    }

    const { container } = render(<TestComponent />);

    // Wait for close button to appear
    await waitFor(() => {
      const closeButton = container.querySelector('.r-onboarding-item__header-close');
      expect(closeButton).toBeTruthy();
    });

    const closeButton = container.querySelector('.r-onboarding-item__header-close');
    await act(async () => {
      fireEvent.click(closeButton!);
    });

    await waitFor(() => {
      expect(onExit).toHaveBeenCalledTimes(1);
      expect(onExit).toHaveBeenCalledWith(0);
    });
  });

  it('should not call onFinish when user exits early', async () => {
    const onFinish = vi.fn();
    const onExit = vi.fn();

    function TestComponent() {
      const wrapperRef = useRef(null);
      const { start } = useROnboarding(wrapperRef);
      useEffect(start, []);
      return (
        <div>
          <div id="foo">Foo</div>
          <div id="bar">Bar</div>
          <ROnboardingWrapper ref={wrapperRef} steps={steps} onFinish={onFinish} onExit={onExit} />
        </div>
      );
    }

    const { container } = render(<TestComponent />);

    // Wait for close button to appear
    await waitFor(() => {
      const closeButton = container.querySelector('.r-onboarding-item__header-close');
      expect(closeButton).toBeTruthy();
    });

    const closeButton = container.querySelector('.r-onboarding-item__header-close');
    await act(async () => {
      fireEvent.click(closeButton!);
    });

    await waitFor(() => {
      expect(onExit).toHaveBeenCalledTimes(1);
    });
    expect(onFinish).not.toHaveBeenCalled();
  });

  it('should not call onExit when tour completes normally', async () => {
    const onFinish = vi.fn();
    const onExit = vi.fn();

    function TestComponent() {
      const wrapperRef = useRef(null);
      const { start } = useROnboarding(wrapperRef);
      useEffect(start, []);
      return (
        <div>
          <div id="foo">Foo</div>
          <div id="bar">Bar</div>
          <ROnboardingWrapper ref={wrapperRef} steps={steps} onFinish={onFinish} onExit={onExit} />
        </div>
      );
    }

    const { findByText } = render(<TestComponent />);

    // Navigate to last step and finish
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    const finishButton = await findByText('Finish');
    await act(async () => {
      fireEvent.click(finishButton);
    });

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(1);
    });
    expect(onExit).not.toHaveBeenCalled();
  });
});
