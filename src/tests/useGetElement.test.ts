import { createRef } from 'react';
import useGetElement from '@/hooks/useGetElement';

describe('useGetElement', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should return null when element is undefined', () => {
    const result = useGetElement(undefined);
    expect(result).toBeNull();
  });

  it('should return null when element is null', () => {
    const result = useGetElement(null);
    expect(result).toBeNull();
  });

  it('should return element when string selector matches an element', () => {
    const div = document.createElement('div');
    div.id = 'test-element';
    document.body.appendChild(div);

    const result = useGetElement('#test-element');
    expect(result).toBe(div);
  });

  it('should return null when string selector does not match any element', () => {
    const result = useGetElement('#non-existent');
    expect(result).toBeNull();
  });

  it('should return element when function returns an element', () => {
    const div = document.createElement('div');
    div.id = 'func-element';
    document.body.appendChild(div);

    const result = useGetElement(() => document.getElementById('func-element'));
    expect(result).toBe(div);
  });

  it('should return null when function returns null', () => {
    const result = useGetElement(() => null);
    expect(result).toBeNull();
  });

  it('should work with class selectors', () => {
    const div = document.createElement('div');
    div.className = 'test-class';
    document.body.appendChild(div);

    const result = useGetElement('.test-class');
    expect(result).toBe(div);
  });

  it('should return first matching element when multiple elements match', () => {
    const div1 = document.createElement('div');
    div1.className = 'multi-class';
    div1.id = 'first';
    document.body.appendChild(div1);

    const div2 = document.createElement('div');
    div2.className = 'multi-class';
    div2.id = 'second';
    document.body.appendChild(div2);

    const result = useGetElement('.multi-class');
    expect(result).toBe(div1);
  });

  it('should return element when ref contains an element', () => {
    const div = document.createElement('div');
    div.id = 'ref-element';
    document.body.appendChild(div);

    const ref = createRef<Element>();
    (ref as { current: Element }).current = div;

    const result = useGetElement(ref);
    expect(result).toBe(div);
  });

  it('should return null when ref.current is null', () => {
    const ref = createRef<Element>();

    const result = useGetElement(ref);
    expect(result).toBeNull();
  });

  it('should return element when ref is updated', () => {
    const div1 = document.createElement('div');
    div1.id = 'ref-element-1';
    document.body.appendChild(div1);

    const div2 = document.createElement('div');
    div2.id = 'ref-element-2';
    document.body.appendChild(div2);

    const ref = { current: div1 };

    expect(useGetElement(ref)).toBe(div1);

    ref.current = div2;

    expect(useGetElement(ref)).toBe(div2);
  });

  it('should return null when ref contains non-Element value (imperative handle)', () => {
    // Simulates a ref created with useImperativeHandle that exposes methods instead of DOM element
    const imperativeHandle = { focus: () => {}, getValue: () => 'test' };
    const ref = { current: imperativeHandle };

    // @ts-expect-error - testing runtime behavior with invalid type
    const result = useGetElement(ref);
    expect(result).toBeNull();
  });
});
