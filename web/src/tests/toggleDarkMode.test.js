import toggleDarkMode from '../pages/Root';
import { describe, expect, it } from 'vitest';

describe('#toggleDarkMode', () => {
  it('Returns dark mode true when false', () => {
    expect(toggleDarkMode()).toBe("Dark Mode True");
  });
});
