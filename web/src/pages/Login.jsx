const Login = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center h-[calc(100vh-94px)]">
      {/* Login Page Heading */}
      <h2 className="text-3xl font-bold mb-12 mt-8">
        Please enter your account details
      </h2>

      {/* Email Input */}
      <div className="flex flex-col gap-3 w-full">
        <div className="mb-4">
          <label className="flex flex-col gap-1 text-lg">
            E-mail
            <input
              type="text"
              placeholder="Please enter your e-mail"
              className="px-4 py-2 w-full border-2 rounded"
            />
          </label>
        </div>
      </div>

      {/* Password Input */}
      <div className="flex flex-col gap-3 w-full">
        <div className="mb-4">
          <label className="flex flex-col gap-1 text-lg">
            Password
            <input
              type="password"
              id="password"
              placeholder="Please enter your password"
              className="px-4 py-2 w-full border-2 rounded"
            />
          </label>
        </div>
      </div>

      {/* Login Button */}
      <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex gap-3 items-center justify-center">
        <span>Login</span>
      </button>
    </div>
  )
}
export default Login
