import { ROnboardingWrapper } from '@/components/index';
import useROnboarding from '@/hooks/useROnboarding';
import { StepEntity } from '@/types/StepEntity';
import { render, waitFor } from '@testing-library/react';
import { useEffect, useRef } from 'react';

describe('HTML content support', () => {
  it('should render HTML content when content.html is true', async () => {
    const steps = [
      {
        attachTo: { element: '#foo' },
        content: {
          title: 'Step Title',
          description: '<strong>Bold text</strong> and <em>italic text</em>',
          html: true,
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
          <ROnboardingWrapper ref={wrapperRef} steps={steps} />
        </div>
      );
    }

    const { container } = render(<TestComponent />);

    await waitFor(() => {
      const description = container.querySelector('.r-onboarding-item__description');
      expect(description).toBeTruthy();
    });

    const description = container.querySelector('.r-onboarding-item__description');
    // Should contain actual HTML elements, not escaped text
    const strongElement = description?.querySelector('strong');
    const emElement = description?.querySelector('em');

    expect(strongElement).toBeTruthy();
    expect(strongElement?.textContent).toBe('Bold text');
    expect(emElement).toBeTruthy();
    expect(emElement?.textContent).toBe('italic text');
  });

  it('should render plain text when content.html is false', async () => {
    const steps = [
      {
        attachTo: { element: '#foo' },
        content: {
          title: 'Step Title',
          description: '<strong>Bold text</strong>',
          html: false,
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
          <ROnboardingWrapper ref={wrapperRef} steps={steps} />
        </div>
      );
    }

    const { container } = render(<TestComponent />);

    await waitFor(() => {
      const description = container.querySelector('.r-onboarding-item__description');
      expect(description).toBeTruthy();
    });

    const description = container.querySelector('.r-onboarding-item__description');
    // Should not contain actual HTML elements
    const strongElement = description?.querySelector('strong');
    expect(strongElement).toBeNull();

    // Should show the raw HTML as text
    expect(description?.textContent).toBe('<strong>Bold text</strong>');
  });

  it('should render plain text by default when content.html is not specified', async () => {
    const steps = [
      {
        attachTo: { element: '#foo' },
        content: {
          title: 'Step Title',
          description: '<strong>Bold text</strong>',
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
          <ROnboardingWrapper ref={wrapperRef} steps={steps} />
        </div>
      );
    }

    const { container } = render(<TestComponent />);

    await waitFor(() => {
      const description = container.querySelector('.r-onboarding-item__description');
      expect(description).toBeTruthy();
    });

    const description = container.querySelector('.r-onboarding-item__description');
    // Should not contain actual HTML elements by default
    const strongElement = description?.querySelector('strong');
    expect(strongElement).toBeNull();
  });

  it('should support HTML in title when content.html is true', async () => {
    const steps = [
      {
        attachTo: { element: '#foo' },
        content: {
          title: '<span class="custom-title">Custom Title</span>',
          description: 'Description',
          html: true,
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
          <ROnboardingWrapper ref={wrapperRef} steps={steps} />
        </div>
      );
    }

    const { container } = render(<TestComponent />);

    await waitFor(() => {
      const title = container.querySelector('.r-onboarding-item__header-title');
      expect(title).toBeTruthy();
    });

    const title = container.querySelector('.r-onboarding-item__header-title');
    const customSpan = title?.querySelector('.custom-title');
    expect(customSpan).toBeTruthy();
    expect(customSpan?.textContent).toBe('Custom Title');
  });
});
