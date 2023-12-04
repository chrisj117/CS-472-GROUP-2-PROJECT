import { useState } from "react"
import InputField from "../components/InputField.jsx"
import { RegisterAuth } from "../utilities/API.jsx"
import FormError from "../components/FormError.jsx"
import FormSuccess from "../components/FormSuccess.jsx"
import { Link } from "react-router-dom"
import { IoMdPersonAdd } from "react-icons/io"
import Popup from "reactjs-popup"
import { BeatLoader } from "react-spinners"
import { FaArrowRight } from "react-icons/fa6"

const Register = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [prevUser, setPrevUser] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const contentStyle = { background: "rgb(63, 63, 70)" }
  const overlayStyle = { background: "rgba(0,0,0,0.8)" }

  const resetDetails = () => {
    setPrevUser(username)
    setEmail("")
    setUsername("")
    setPassword("")
    setConfirmPassword("")
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!loading) setLoading(true)
    else return

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
    setSuccess("Registration Successful.")

    setTimeout(() => {
      setModalOpen(true)
      setLoading(false)
      setSuccess("")
      resetDetails()
    }, 1000)
    return
  }

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col items-center h-[calc(100vh-98px)] w-screen mx-auto px-4 md:max-w-screen-xl overflow-auto"
    >
      <Popup
        open={modalOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        modal
        {...{ overlayStyle, contentStyle }}
      >
        <div className="text-white flex flex-col items-center justify-center gap-8 px-4 py-8 max-w-2xl">
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-xl">
              Hello <span className="font-semibold">{prevUser}</span>{" "}
            </p>
            <p className="text-center">
              You will be receiving an email within the next few minutes to
              confirm your account registration. Once you are verified, click
              the button below.
            </p>
          </div>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 flex mt-2 gap-2 items-center justify-center font-semibold"
            replace={true}
          >
            Login <FaArrowRight className="text-xl" />
          </Link>
        </div>
      </Popup>

      {/* Account registration page banner */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 mt-4 md:mt-8">Register</h2>

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
        labelName=""
        inputType="password"
        inputID="confirmPassword"
        inputPlaceholder="Confirm Password"
        onChange={(e) => {
          setConfirmPassword(e.target.value)
        }}
      />

      <FormError error={error} />
      <FormSuccess success={success} />

      {/* Register button */}
      <button className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 flex mt-8 gap-2 items-center justify-center font-semibold">
        {loading ? (
          <BeatLoader color="#ffffff" size="10px" />
        ) : (
          <>
            Register <IoMdPersonAdd className="text-lg" />
          </>
        )}
      </button>
    </form>
  )
}
export default Register
