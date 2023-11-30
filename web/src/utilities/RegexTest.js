export function EmailRegexTest(data) {
  return data.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
}

export function UsernameRegexTest(data) {
  return data.match(/^[a-zA-Z0-9]{4,24}$/);
}

export function PasswordRegexTest(data) {
  return data.match(/^.{6,32}$/);
}

