export function EmailRegexTest(data) {
  return RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(data)
}

export function UsernameRegexTest(data) {
  return RegExp(/^[a-zA-Z0-9]{3,24}$/).test(data)
}

export function PasswordRegexTest(data) {
  return RegExp(/^.{6,68}$/).test(data)
}

export function LinkRegexTest(data) {
  return RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/).test(data)
}

export function MaxCharacterTest(data, minLength, maxLength) {
  return RegExp(`^.{${minLength},${maxLength}}$`).test(data)
}

export function NormalCharactersTest(data) {
  return RegExp(/^[a-zA-Z\s]*$/).test(data)
}
