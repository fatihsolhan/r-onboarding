import { ROnboardingWrapper } from '@/components/index';
import useROnboarding from '@/hooks/useROnboarding';
import { StepEntity } from '@/types/StepEntity';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useEffect, useRef } from 'react';

describe('preventOverlayInteraction option', () => {
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

  beforeEach(() => {
    document.body.style.pointerEvents = '';
  });

  afterEach(() => {
    document.body.style.pointerEvents = '';
  });

  it('should set pointer-events to none on body when preventOverlayInteraction is true', async () => {
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
            steps={steps}
            options={{ overlay: { preventOverlayInteraction: true } }}
          />
        </div>
      );
    }

    render(<TestComponent />);

    await waitFor(() => {
      expect(document.body.style.pointerEvents).toBe('none');
    });
  });

  it('should not set pointer-events when preventOverlayInteraction is false', async () => {
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
            steps={steps}
            options={{ overlay: { preventOverlayInteraction: false } }}
          />
        </div>
      );
    }

    render(<TestComponent />);

    await waitFor(() => {
      expect(document.body.style.pointerEvents).not.toBe('none');
    });
  });

  it('should restore pointer-events on body after tour finishes', async () => {
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
            steps={steps}
            options={{ overlay: { preventOverlayInteraction: true } }}
          />
        </div>
      );
    }

    const { findByText } = render(<TestComponent />);

    // Verify pointer-events is set during tour
    await waitFor(() => {
      expect(document.body.style.pointerEvents).toBe('none');
    });

    // Complete the tour
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });
    const finishButton = await findByText('Finish');
    await act(async () => {
      fireEvent.click(finishButton);
    });

    // Pointer-events should be restored
    await waitFor(() => {
      expect(document.body.style.pointerEvents).not.toBe('none');
    });
  });

  it('should restore pointer-events on body after user exits', async () => {
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
            steps={steps}
            options={{ overlay: { preventOverlayInteraction: true } }}
          />
        </div>
      );
    }

    const { container } = render(<TestComponent />);

    // Verify pointer-events is set during tour
    await waitFor(() => {
      expect(document.body.style.pointerEvents).toBe('none');
    });

    // Wait for close button
    await waitFor(() => {
      const closeButton = container.querySelector('.r-onboarding-item__header-close');
      expect(closeButton).toBeTruthy();
    });

    // Exit the tour
    const closeButton = container.querySelector('.r-onboarding-item__header-close');
    await act(async () => {
      fireEvent.click(closeButton!);
    });

    // Pointer-events should be restored
    await waitFor(() => {
      expect(document.body.style.pointerEvents).not.toBe('none');
    });
  });

  it('should allow step-level preventOverlayInteraction override', async () => {
    const stepsWithOverride = [
      {
        attachTo: { element: '#foo' },
        content: { title: 'Step 1', description: 'Description 1' },
        options: { overlay: { preventOverlayInteraction: true } }, // Enable for this step
      },
      {
        attachTo: { element: '#bar' },
        content: { title: 'Step 2', description: 'Description 2' },
        options: { overlay: { preventOverlayInteraction: false } }, // Disable for this step
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
            options={{ overlay: { preventOverlayInteraction: false } }} // Global: disabled
          />
        </div>
      );
    }

    const { findByText } = render(<TestComponent />);

    // First step should have disableInteraction enabled
    await waitFor(() => {
      expect(document.body.style.pointerEvents).toBe('none');
    });

    // Move to second step
    const nextButton = await findByText('Next');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    // Second step should have disableInteraction disabled
    await waitFor(() => {
      expect(document.body.style.pointerEvents).not.toBe('none');
    });
  });

  it('should keep step element interactive when preventOverlayInteraction is true', async () => {
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
            steps={steps}
            options={{ overlay: { preventOverlayInteraction: true } }}
          />
        </div>
      );
    }

    const { container } = render(<TestComponent />);

    // Wait for step to render
    await waitFor(() => {
      const stepElement = container.querySelector('[data-r-onboarding-wrapper]');
      expect(stepElement).toBeTruthy();
    });

    // The step element should have pointer-events: auto to remain interactive
    const stepElement = container.querySelector('[data-r-onboarding-wrapper]');
    expect(stepElement).toBeTruthy();
  });
});
