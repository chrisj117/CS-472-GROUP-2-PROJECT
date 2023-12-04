import { UsernameRegexTest, 
  EmailRegexTest, 
  PasswordRegexTest, 
  LinkRegexTest, 
  MaxCharacterTest, 
  NormalCharactersTest } from '../utilities/RegexTest';
import { describe, expect, it } from 'vitest';

describe('#UsernameRegexTest', () => {
  it('Returns false with special characters', () => {
    expect(UsernameRegexTest('Test.Name')).toBe(false);
  });

  it('Returns true with normal characters', () => {
    expect(UsernameRegexTest('TestName')).toBe(true);
  });
});

describe('#EmailRegexTest', () => {
  it('Returns false with non email format', () => {
    expect(EmailRegexTest('Mail.com')).toBe(false);
  });

  it('Returns true with email format', () => {
    expect(EmailRegexTest('name@mail.com')).toBe(true);
  });
});

describe('#PasswordRegexTest', () => {
  it('Returns false with too few characters', () => {
    expect(PasswordRegexTest('123')).toBe(false);
  });

  it('Returns true with normal password input', () => {
    expect(PasswordRegexTest('12345678')).toBe(true);
  });
});

describe('#LinkRegexTest', () => {
  it('Returns false without website format', () => {
    expect(LinkRegexTest('normal text')).toBe(false);
  });

  it('Returns true with normal website', () => {
    expect(LinkRegexTest('https://website.com')).toBe(true);
  });
});

describe('#LinkRegexTest', () => {
  it('Returns false with too many characters', () => {
    expect(MaxCharacterTest('normal text exceed max length', 1, 8)).toBe(false);
  });

  it('Returns true with in-range characters count', () => {
    expect(MaxCharacterTest('normal text exceed max length', 1, 32)).toBe(true);
  });
});

describe('#NormalCharacterTest', () => {
  it('Returns false with special characters', () => {
    expect(NormalCharactersTest('Dr* Professor')).toBe(false);
  });

  it('Returns true with legal characters', () => {
    expect(NormalCharactersTest('First Last')).toBe(true);
  });
});