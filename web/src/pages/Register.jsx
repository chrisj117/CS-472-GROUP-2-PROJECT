import InputField from "../components/InputField.jsx"

const Register = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center h-[calc(100vh-94px)]">
      {/* Account registration page banner */}
      <h2 className="text-3xl font-bold mb-12 mt-8">Account Registration</h2>

      {/* E-mail input */}
      <InputField
        labelName="E-mail"
        inputType="text"
        inputID="email"
        inputPlaceholder="E-mail"
      />

      {/* Username */}
      <InputField
        labelName="Username"
        inputType="text"
        inputID="username"
        inputPlaceholder="Username"
      />

      {/* 1st password input */}
      <InputField
        labelName="Password"
        inputType="password"
        inputID="password"
        inputPlaceholder="Password (must be 8 characters long and include at least 1 numeric character)"
      />

      {/* Password confirmation input */}
      <InputField
        labelName=""
        inputType="password"
        inputID="confirmPassword"
        inputPlaceholder="Confirm password"
      />

      {/* Register button */}
      <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex gap-3 items-center justify-center">
        <span>Register</span>
      </button>
    </div>
  )
}
export default Register
