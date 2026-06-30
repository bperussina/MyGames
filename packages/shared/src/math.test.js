import { describe, it, expect } from 'vitest';
import { clamp, distance, random } from '@mygames/shared';

describe('math helpers', () => {
  it('clamps values inside a range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });

  it('calculates distance between two points', () => {
    expect(distance(0, 0, 3, 4)).toBe(5);
  });

  it('returns numbers inside a range', () => {
    for (let i = 0; i < 20; i += 1) {
      const value = random(2, 4);
      expect(value).toBeGreaterThanOrEqual(2);
      expect(value).toBeLessThan(4);
    }
  });
});
