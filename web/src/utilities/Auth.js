import api from './Axios'
import { EmailRegexTest, PasswordRegexTest, UsernameRegexTest } from './RegexTest'

export async function LoginAuth(data) {
  try {
    const response = await api.post("/auth/login/", data)
    if (response && response.data) return(response.data.data)
  } catch (err) {
    if (err.response) {
      // Not in the 200 response range

      // console.log(err.response.data)
      // console.log(err.response.status)
      // console.log(err.response.headers)

      return "ERROR: Invalid Credentials."
    } else {
      return `ERROR: ${err.message}`
    }
  }
}

export async function RegisterAuth(data) {
  if(!EmailRegexTest(data.email)) {
    return "ERROR: Invalid email format."
  }

  if(!UsernameRegexTest(data.username)) {
    return "ERROR: Invalid username Format. Please keep character count between 3-24 characters."
  }

  if(!PasswordRegexTest(data.password)) {
    return "ERROR: Invalid password format. Please keep character count between 6-68 characters."
  }

  if(data.password != data.confirmPassword) {
    return "ERROR: Passwords do not match."
  }

  try {
    const response = await api.post("/auth/register/", data)
    if(response && response.data) return(response.data.data)
  } catch (err) {
    if (err.response) {
      // Not in the 200 response range
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
      return `ERROR: ${err.response.data}`
    } else {
      console.log(`Error: ${err.message}`)
      return "ERROR: Invalid credentials."
    }
  }
}