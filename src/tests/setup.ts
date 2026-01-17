import { vi } from 'vitest';

// Mock ResizeObserver which is not implemented in jsdom
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame and cancelAnimationFrame
// Use direct function assignment instead of vi.fn() to ensure it works in recursive calls
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(() => callback(performance.now()), 0) as unknown as number;
};
global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};

// Mock scrollIntoView which is not implemented in jsdom
Element.prototype.scrollIntoView = vi.fn();

// Mock getBoundingClientRect if needed
if (!Element.prototype.getBoundingClientRect) {
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }));
}
