import InputField from "../components/InputField.jsx";

const Login = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center">
      {/* Login Page Heading */}
      <h2 className="text-3xl font-bold mb-12 mt-8">
        Please enter your account details
      </h2>

      {/* Email Input */}
      <InputField
        labelName="E-mail"
        inputType="text"
        inputID="email"
        inputPlaceholder="Please enter your e-mail"
      />

      {/* Password Input */}
      <InputField
        labelName="Password"
        inputType="password"
        inputID="password"
        inputPlaceholder="Please enter your password"
      />

      {/* Login Button */}
      <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex gap-3 items-center justify-center">
        <span>Login</span>
      </button>
    </div>
  );
};
export default Login;
