const Register = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center h-[calc(100vh-94px)]">
      {/* Account registration page banner */}
      <h2 className="text-3xl font-bold mb-12 mt-8">Account Registration</h2>

      {/* E-mail input */}
      <div className="flex flex-col gap-3 w-full">
        <div className="mb-4">
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

      {/* Username */}
      <div className="flex flex-col gap-3 w-full">
        <div className="mb-4">
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

      {/* 1st password input */}
      <div className="flex flex-col gap-3 w-full">
        <div className="mb-4">
          <label className="flex flex-col gap-1 text-lg">
            Password
            <input
              type="password"
              id="password"
              placeholder="Password (must be 8 characters long and include at least 1 numeric character)"
              className="px-4 py-2 w-full border-2 rounded"
            />
          </label>
        </div>
      </div>

      {/* Password confirmation input */}
      <div className="flex flex-col gap-3 w-full">
        <div className="mb-4">
          <label className="flex flex-col gap-1 text-lg">
            <input
              type="password"
              id="password"
              placeholder="Confirm password"
              className="px-4 py-2 w-full border-2 rounded"
            />
          </label>
        </div>
      </div>

      {/* Register button */}
      <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex gap-3 items-center justify-center">
        <span>Register</span>
      </button>
    </div>
  )
}
export default Register
