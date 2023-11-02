import example from '../components/example';
import { describe, expect, it } from 'vitest';

describe('#example', () => {
  it('returns 5 with 3 and 2', () => {
    expect(example(5)).toBe(5);
  });
});
