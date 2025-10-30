/**
 * Performance logging utilities
 *
 * Set ENABLE_PERFORMANCE_LOGGING to true to enable performance measurements
 * and console logging for puzzle generation and rendering times.
 */

// Global flag for performance logging - change this to enable/disable
const ENABLE_PERFORMANCE_LOGGING = false;

/**
 * Logs a performance measurement if logging is enabled
 * @param label - Description of what was measured
 * @param timeMs - Time in milliseconds
 */
export function logPerformance(label: string, timeMs: number): void {
  if (ENABLE_PERFORMANCE_LOGGING) {
    console.log(`[Performance] ${label}: ${timeMs.toFixed(2)}ms`);
  }
}

/**
 * Measures the execution time of a synchronous function
 * @param label - Description for logging
 * @param fn - Function to measure
 * @returns The return value of the function
 */
export function measureSync<T>(label: string, fn: () => T): T {
  if (!ENABLE_PERFORMANCE_LOGGING) {
    return fn();
  }

  const start = performance.now();
  const result = fn();
  const end = performance.now();
  logPerformance(label, end - start);
  return result;
}

/**
 * Measures the execution time of an async function
 * @param label - Description for logging
 * @param fn - Async function to measure
 * @returns A promise with the return value of the function
 */
export async function measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
  if (!ENABLE_PERFORMANCE_LOGGING) {
    return fn();
  }

  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  logPerformance(label, end - start);
  return result;
}
