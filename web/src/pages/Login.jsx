import { useState } from "react"
import InputField from "../components/InputField.jsx"
import FormError from "../components/FormError.jsx"
import FormSuccess from "../components/FormSuccess.jsx"
import { LoginAuth } from "../utilities/Auth.js"
import { Link } from "react-router-dom"
import { IoMdPerson } from "react-icons/io"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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
        inputPlaceholder="Ex: student@unlv.nevada.edu"
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />

      {/* Password Input */}
      <InputField
        labelName="Password"
        inputType="password"
        inputID="password"
        inputPlaceholder="Password must be between 6-68 characters"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />

      {error || success ? (
        <>
          <FormError error={error} />
          <FormSuccess success={success} />
        </>
      ) : null}

      {/* Login Button */}
      <button className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 flex gap-2 items-center justify-center mt-2 font-semibold">
        Login <IoMdPerson className="text-lg" />
      </button>

      <p className="mt-7 text-lg">
        Don't have an account yet?{" "}
        <Link to="/register" replace={true} className="text-blue-500 underline">
          Register here
        </Link>
      </p>
    </form>
  )
}
export default Login
