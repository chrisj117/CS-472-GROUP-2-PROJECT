import { useState } from "react"
import { useAuth } from "../utilities/AuthProvider"
import { PasswordResetAuth } from "../utilities/API.jsx"
import { BeatLoader } from "react-spinners"
import FormError from "../components/FormError"
import FormSuccess from "../components/FormSuccess.jsx"
import { FaLock } from "react-icons/fa"

const PasswordReset = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const { email } = useAuth()

  const handlePasswordReset = async (e) => {
    e.preventDefault()

    if (!loading) setLoading(true)
    else return

    const response = await PasswordResetAuth({ email: email })

    if (typeof response === "string") {
      if (response.includes("ERROR:")) {
        setError(response.substring(7))
        setSuccess("")
        setLoading(false)
        return
      }
    }

    setError("")

    setTimeout(() => {
      setSuccess("Password Reset Email Sent.")
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="flex flex-col items-center min-h-[calc(100vh-98px)] w-full max-w-screen-md mx-auto">
      <h2 className="text-3xl font-bold mb-12 mt-8">Password Reset</h2>

      <div className="flex flex-col gap-2 items-center w-full">
        <form
          onSubmit={handlePasswordReset}
          className="w-full flex flex-col gap-4 justify-center"
        >
          <label>Enter Your New Password</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Password between 6-68 characters"
              className="px-2 py-1 flex-1 border-2 rounded truncate dark:text-black"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex gap-3 items-center justify-center">
              {loading ? (
                <BeatLoader color="#ffffff" size="14px" />
              ) : (
                <>
                  Set New Password <FaLock className="text-lg" />
                </>
              )}
            </button>
          </div>
        </form>

        {error || success ? (
          <>
            <FormError error={error} />
            <FormSuccess success={success} />
          </>
        ) : null}
      </div>
    </section>
  )
}
export default PasswordReset
