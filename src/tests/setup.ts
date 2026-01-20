import { vi } from 'vitest';

// Mock ResizeObserver (not implemented in jsdom)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame and cancelAnimationFrame
const pendingFrames = new Map<number, ReturnType<typeof setTimeout>>();
let nextFrameId = 0;

global.requestAnimationFrame = function requestAnimationFrame(callback: FrameRequestCallback): number {
  const frameId = ++nextFrameId;
  const timeoutId = setTimeout(() => {
    if (pendingFrames.has(frameId)) {
      pendingFrames.delete(frameId);
      callback(performance.now());
    }
  }, 0);
  pendingFrames.set(frameId, timeoutId);
  return frameId;
};

global.cancelAnimationFrame = function cancelAnimationFrame(frameId: number): void {
  const timeoutId = pendingFrames.get(frameId);
  if (timeoutId !== undefined) {
    clearTimeout(timeoutId);
    pendingFrames.delete(frameId);
  }
};

afterEach(() => {
  for (const [frameId, timeoutId] of pendingFrames) {
    clearTimeout(timeoutId);
    pendingFrames.delete(frameId);
  }
});

// Mock scrollIntoView (not implemented in jsdom)
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
