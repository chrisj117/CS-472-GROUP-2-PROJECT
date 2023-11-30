import { useEffect, useState } from "react"
import InputField from "../components/InputField.jsx"
import FormError from "../components/FormError.jsx"
import { LoginAuth } from "../utilities/Auth.js"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const loginResult = await LoginAuth({ email: email, password: password })

    if (loginResult.includes("ERROR:")) {
      setError(loginResult.substring(7))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-screen-xl mx-auto flex flex-col items-center h-[calc(100vh-94px)]"
    >
      {/* Login Page Heading */}
      <h2 className="text-3xl font-bold mb-12 mt-8">Login</h2>

      {/* Email Input */}
      <InputField
        labelName="E-mail"
        inputType="text"
        inputID="email"
        inputPlaceholder="Please enter your e-mail"
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />

      {/* Password Input */}
      <InputField
        labelName="Password"
        inputType="password"
        inputID="password"
        inputPlaceholder="Please enter your password"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />

      <FormError error={error} />

      {/* Login Button */}
      <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex gap-3 items-center justify-center">
        Login
      </button>
    </form>
  )
}
export default Login
