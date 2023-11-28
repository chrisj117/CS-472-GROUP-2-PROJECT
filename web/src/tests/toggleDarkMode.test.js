import toggleDarkMode from '../pages/Root';
import { describe, expect, it } from 'vitest';

describe('#toggleDarkMode', () => {
  it('Returns dark mode true when false', () => {
    expect(toggleDarkMode()).toBe("Dark Mode True");
  });
});

describe('#toggleDarkMode', () => {
  it('Returns dark mode false when true', () => {
    expect(toggleDarkMode()).toBe("Dark Mode False");
  });
});

