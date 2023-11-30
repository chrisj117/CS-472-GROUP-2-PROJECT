import { useState } from "react"
import InputField from "../components/InputField.jsx"
import { RegisterAuth } from "../utilities/Auth.js"
import FormError from "../components/FormError.jsx"

const Register = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const registerResult = await RegisterAuth({
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    })

    if (registerResult.includes("ERROR:")) {
      setError(registerResult.substring(7))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-screen-xl mx-auto flex flex-col items-center h-[calc(100vh-94px)]"
    >
      {/* Account registration page banner */}
      <h2 className="text-3xl font-bold mb-12 mt-8">Register</h2>

      {/* E-mail input */}
      <InputField
        labelName="E-mail"
        inputType="text"
        inputID="email"
        inputPlaceholder="E-mail"
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />

      {/* Username */}
      <InputField
        labelName="Username"
        inputType="text"
        inputID="username"
        inputPlaceholder="Username"
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />

      {/* 1st password input */}
      <InputField
        labelName="Password"
        inputType="password"
        inputID="password"
        inputPlaceholder="Password (must be 8 characters long and include at least 1 numeric character)"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />

      {/* Password confirmation input */}
      <InputField
        labelName=""
        inputType="password"
        inputID="confirmPassword"
        inputPlaceholder="Confirm password"
        onChange={(e) => {
          setConfirmPassword(e.target.value)
        }}
      />

      <FormError error={error} />
      <FormSuccess
        success={
          "Registration Successful. Please wait a few seconds to be redirected."
        }
      />

      {/* Register button */}
      <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex gap-3 items-center justify-center">
        Register
      </button>
    </form>
  )
}
export default Register
