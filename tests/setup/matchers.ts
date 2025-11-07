import { afterEach } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});

class ResizeObserverStub implements ResizeObserver {
  private callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  disconnect(): void {
    // no-op for tests
  }

  observe(): void {
    // no-op for tests
  }

  unobserve(): void {
    // no-op for tests
  }

  takeRecords(): ResizeObserverEntry[] {
    return [];
  }
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
}
