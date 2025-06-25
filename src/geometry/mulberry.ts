
/**
 * Simple seeded PRNG. The state space is 32 bits, so the period (the point at
 * which random numbers repeat for the same seed) is 2^32.
 * See https://github.com/cprosche/mulberry32 for more details.
 * @param seed seed number
 * @returns function which returns a random number each time it is called
 */
export function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
export default mulberry32;
