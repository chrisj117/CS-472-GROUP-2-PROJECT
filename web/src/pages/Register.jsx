import { useState } from "react"
import InputField from "../components/InputField.jsx"
import { LoginAuth, RegisterAuth } from "../utilities/Auth.jsx"
import FormError from "../components/FormError.jsx"
import FormSuccess from "../components/FormSuccess.jsx"
import { useNavigate } from "react-router-dom"
import { IoMdPersonAdd } from "react-icons/io"

const Register = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    const registerResult = await RegisterAuth({
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    })

    if (typeof registerResult === "string") {
      if (registerResult.includes("ERROR:")) {
        setError(registerResult.substring(7))
        setSuccess("")
        setLoading(false)
        return
      }
    }

    setError("")
    setSuccess(
      "Registration Successful, please wait a moment before being redirected."
    )

    const loginResult = await LoginAuth({
      email: email,
      password: password,
    })

    if (typeof registerResult === "string") {
      if (loginResult.includes("ERROR:")) {
        setError("Login Failed. Redirecting to login page.")
        setSuccess("")
        setTimeout(() => {
          navigate("/login")
        }, 1500)
        return
      }
    }

    setTimeout(() => {
      navigate("/")
    }, 2000)
  }

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-screen-xl mx-auto flex flex-col items-center h-[calc(100vh-94px)]"
    >
      {/* Account registration page banner */}
      <h2 className="text-3xl font-bold mb-12 mt-8">Register</h2>

      {/* E-mail input */}
      <InputField
        labelName="E-mail"
        inputType="text"
        inputID="email"
        inputPlaceholder="Ex: student@unlv.nevada.edu"
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />

      {/* Username */}
      <InputField
        labelName="Username"
        inputType="text"
        inputID="username"
        inputPlaceholder="Ex: Student123"
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />

      {/* 1st password input */}
      <InputField
        labelName="Password"
        inputType="password"
        inputID="password"
        inputPlaceholder="Password must be between 6-68 characters"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />

      {/* Password confirmation input */}
      <InputField
        labelName="Confirm Password"
        inputType="password"
        inputID="confirmPassword"
        inputPlaceholder="Enter the same password"
        onChange={(e) => {
          setConfirmPassword(e.target.value)
        }}
      />

      <FormError error={error} />
      <FormSuccess success={success} />

      {/* Register button */}
      <button className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 flex mt-2 gap-2 items-center justify-center font-semibold">
        Register <IoMdPersonAdd className="text-lg" />
      </button>
    </form>
  )
}
export default Register
