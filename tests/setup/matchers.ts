import { afterEach } from 'vitest';

const noop = () => undefined;
const canvasContextMap = new WeakMap<HTMLCanvasElement, CanvasRenderingContext2D>();
let canvasPatched = false;

const createContextStub = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const measurement = {
    width: 0,
    actualBoundingBoxAscent: 0,
    actualBoundingBoxDescent: 0,
    actualBoundingBoxLeft: 0,
    actualBoundingBoxRight: 0,
    alphabeticBaseline: 0,
    fontBoundingBoxAscent: 0,
    fontBoundingBoxDescent: 0,
    hangingBaseline: 0,
    ideographicBaseline: 0,
    emHeightAscent: 0,
    emHeightDescent: 0,
  } satisfies TextMetrics;

  const gradient = { addColorStop: noop };
  const imageData = {
    data: new Uint8ClampedArray(canvas.width * canvas.height * 4),
    width: canvas.width,
    height: canvas.height,
  };

  const target = {} as CanvasRenderingContext2D;
  Object.defineProperty(target, 'canvas', {
    value: canvas,
    writable: false,
  });
  const propertyStore = new Map<PropertyKey, unknown>([
    ['lineWidth', 1],
    ['globalAlpha', 1],
    ['fillStyle', '#000000'],
    ['strokeStyle', '#000000'],
    ['font', '10px sans-serif'],
    ['globalCompositeOperation', 'source-over'],
  ]);

  return new Proxy(target, {
    get(_, prop) {
      if (prop === 'canvas') {
        return canvas;
      }
      if (prop === 'measureText') {
        return () => measurement;
      }
      if (prop === 'createLinearGradient' || prop === 'createRadialGradient') {
        return () => gradient;
      }
      if (prop === 'getImageData') {
        return () => imageData;
      }
      if (prop === 'save' || prop === 'restore' || prop === 'beginPath' || prop === 'moveTo' || prop === 'lineTo') {
        return noop;
      }
      if (typeof prop === 'string' && propertyStore.has(prop)) {
        return propertyStore.get(prop);
      }
      return noop;
    },
    set(_, prop, value) {
      if (typeof prop === 'string') {
        propertyStore.set(prop, value);
        return true;
      }
      return false;
    },
  });
};

const ensureCanvasMocks = (): void => {
  if (canvasPatched || typeof HTMLCanvasElement === 'undefined') {
    return;
  }

  const callOriginalGetContext = (() => {
    // Capturing the original implementation before we patch it.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const method = HTMLCanvasElement.prototype.getContext;
    return (
      element: HTMLCanvasElement,
      contextId: CanvasContextId,
      options?: CanvasContextOptions
    ): CanvasContextReturn => {
      return method ? method.call(element, contextId, options) : null;
    };
  })();
  type CanvasContextId = Parameters<typeof HTMLCanvasElement.prototype.getContext>[0];
  type CanvasContextOptions = Parameters<typeof HTMLCanvasElement.prototype.getContext>[1];
  type CanvasContextReturn = ReturnType<typeof HTMLCanvasElement.prototype.getContext>;

  const patchedGetContext = function getContext(
    this: HTMLCanvasElement,
    contextId: CanvasContextId,
    options?: CanvasContextOptions
  ): CanvasContextReturn {
    if (contextId === '2d') {
      if (!canvasContextMap.has(this)) {
        canvasContextMap.set(this, createContextStub(this));
      }
      return canvasContextMap.get(this) ?? null;
    }
    return callOriginalGetContext(this, contextId, options);
  };

  HTMLCanvasElement.prototype.getContext = patchedGetContext as typeof HTMLCanvasElement.prototype.getContext;

  canvasPatched = true;
};

ensureCanvasMocks();

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
