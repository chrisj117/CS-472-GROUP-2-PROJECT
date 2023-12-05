import { useState } from "react"
import InputField from "../components/InputField.jsx"
import FormError from "../components/FormError.jsx"
import FormSuccess from "../components/FormSuccess.jsx"
import { LoginAuth, PasswordResetAuth } from "../utilities/API.jsx"
import { Link, useNavigate } from "react-router-dom"
import { IoMdPerson } from "react-icons/io"
import { useAuth } from "../utilities/AuthProvider.jsx"
import { BeatLoader } from "react-spinners"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingForgot, setLoadingForgot] = useState(false)
  const [resetMessage, setResetMessage] = useState("")
  const { authProviderLogin } = useAuth()

  const navigate = useNavigate()

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    if (!loadingForgot) {
      setLoadingForgot(true)
    } else return

    const forgotResult = await PasswordResetAuth({ email: email })

    if (typeof forgotResult === "string") {
      if (forgotResult.includes("ERROR:")) {
        setResetMessage(forgotResult.substring(7))
        setLoadingForgot(false)
        return
      }
    }

    setResetMessage("")

    setTimeout(() => {
      setResetMessage("Password Reset Email Sent.")
      setLoadingForgot(false)
    }, 1000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!loading) {
      setLoading(true)
    } else return

    const loginResult = await LoginAuth({ email: email, password: password })

    if (typeof loginResult === "string") {
      if (loginResult.includes("ERROR:")) {
        setError(loginResult.substring(7))
        setSuccess("")
        setLoading(false)
        return
      }
    }

    setError("")
    setSuccess(
      "Login Successful, please wait a moment before being redirected."
    )

    setTimeout(() => {
      authProviderLogin(
        loginResult.tokens.access,
        loginResult.username,
        loginResult.email
      )
      setLoading(false)
      navigate("/")
    }, 1000)
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center h-[calc(100vh-98px)] w-screen mx-auto px-4 md:max-w-screen-xl overflow-auto"
    >
      {/* Login Page Heading */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 mt-4 md:mt-8">Login</h2>
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
      <div className="w-full">
        <InputField
          labelName="Password"
          inputType="password"
          inputID="password"
          inputPlaceholder="Password must be between 6-68 characters"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <span className="text-sm flex gap-4">
          <div className="flex gap-1 items-center justify-center">
            Forgot password?{" "}
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-500 underline flex items-center justify-center"
            >
              {loadingForgot ? (
                <BeatLoader color="#ffffff" size="10px" />
              ) : (
                <>Reset Here</>
              )}
            </button>
          </div>
          <span className="md:ml-4">{resetMessage}</span>
        </span>
      </div>

      {error || success ? (
        <>
          <FormError error={error} />
          <FormSuccess success={success} />
        </>
      ) : null}
      {/* Login Button */}
      <button className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 flex mt-8 gap-2 items-center justify-center font-semibold">
        {loading ? (
          <BeatLoader color="#ffffff" size="10px" />
        ) : (
          <>
            Login <IoMdPerson className="text-lg" />
          </>
        )}
      </button>
      <p className="mt-4 md:mt-6 text-md lg:text-lg">
        Don&apos;t have an account yet?{" "}
        <Link to="/register" replace={true} className="text-blue-500 underline">
          Register here
        </Link>
      </p>
    </form>
  )
}
export default Login
