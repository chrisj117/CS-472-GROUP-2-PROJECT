import api from "./Axios"
import {
  EmailRegexTest,
  PasswordRegexTest,
  UsernameRegexTest,
  LinkRegexTest,
  MaxCharacterTest,
} from "./RegexTest"

export async function LoginAuth(data) {
  try {
    const response = await api.post("/auth/login/", data)
    if (response) return response.data
  } catch (err) {
    if (err.response) {
      // Not in the 200 response range
      if (
        err.response.data.detail &&
        err.response.data.detail.includes("Email is not verified")
      ) {
        return "ERROR: Email is not verified."
      }
      return "ERROR: Invalid credentials."
    } else {
      return `ERROR: ${err.message}`
    }
  }
}

export async function RegisterAuth(data) {
  if (!EmailRegexTest(data.email)) {
    return "ERROR: Invalid email format."
  }

  if (!UsernameRegexTest(data.username)) {
    return "ERROR: Invalid username Format. Please keep character count between 3-24 characters."
  }

  if (!PasswordRegexTest(data.password)) {
    return "ERROR: Invalid password format. Please keep character count between 6-68 characters."
  }

  if (data.password != data.confirmPassword) {
    return "ERROR: Passwords do not match."
  }

  try {
    const response = await api.post("/auth/register/", data)
    if (response) return response.data
  } catch (err) {
    if (err.response) {
      // Not in the 200 response range
      if (err.response.data.errors.email) {
        return "ERROR: This email is already in use."
      }

      if (err.response.data.errors.username) {
        return "ERROR: This username is already in use."
      }

      return `ERROR: ${err.response.data}`
    } else {
      console.log(`Error: ${err.message}`)
      return "ERROR: Invalid credentials."
    }
  }
}

export async function PasswordResetAuth(data) {
  if (!EmailRegexTest(data.email)) {
    return "ERROR: Invalid email format."
  }
  try {
    const response = await api.post("/auth/request-reset-email/", data)
    if (response) return response.data
  } catch (err) {
    if (err.response) {
      // Not in the 200 response range
      console.log(`Error: ${err.response.data}`)
    } else {
      console.log(`Error: ${err.message}`)
    }
  }
}

export async function SendSchoolInfo(data) {
  if (!MaxCharacterTest(data.name, 3, 80)) {
    return "ERROR: Keep name between 3-80 characters."
  }

  if (!LinkRegexTest(data.website)) {
    return "ERROR: Invalid website format."
  }

  try {
    const response = await api.post("/request-school/", data)
    if (response) return response.data
  } catch (err) {
    if (err.response) {
      // Not in the 200 response range
      return "ERROR: School already requested!"
    } else {
      return "ERROR: School already requested!"
      // console.log(`Error: ${err.message}`)
    }
  }
}
