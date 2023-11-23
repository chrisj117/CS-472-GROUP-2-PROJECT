const Register = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-12 mt-8">Account Registration</h2>
      <div className="flex flex-col gap-3 w-full">
      <div className="mb-4">
        {/* E-mail input */}
        <label className="flex flex-col gap-1 text-lg">
          E-mail
          <input
            type="text"
            placeholder="E-mail"
            className="px-4 py-2 w-full border-2 rounded"
          />
        </label>
      </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
      <div className="mb-4">
        {/* Username */}
        <label className="flex flex-col gap-1 text-lg">
          Username
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 w-full border-2 rounded"
          />
        </label>
      </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
      <div className="mb-4">
        {/* 1st password input */}
        <label className="flex flex-col gap-1 text-lg">
          Password
          <input
            type="text"
            placeholder="Password (must be 8 characters long and include at least 1 numeric character)"
            className="px-4 py-2 w-full border-2 rounded"
          />
        </label>
      </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
      <div className="mb-4">
        {/* Password confirmation input */}
        <label className="flex flex-col gap-1 text-lg">
          <input
            type="text"
            placeholder="Confirm password"
            className="px-4 py-2 w-full border-2 rounded"
          />
        </label>
      </div>
      </div>
    </div>
  )
}
export default Register
