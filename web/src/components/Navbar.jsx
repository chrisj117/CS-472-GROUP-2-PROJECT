import { Link } from "react-router-dom"
import { BsSun } from "react-icons/bs"
import { MdSchool } from "react-icons/md"

const Navbar = () => {
  return (
    <header className="bg-white text-black py-6 xl:px-10 px-6 flex justify-between items-center border-b-2 border-gray-200">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <div>
          <span className="hidden lg:inline-block text-black text-4xl font-extrabold">
            MyCourse
          </span>
          <span className="hidden lg:inline-block text-blue-600 text-4xl font-extrabold">
            Evaluation
          </span>
        </div>
        <MdSchool className="text-5xl xl:text-2xl" />
      </Link>
      {/* Top Right Corner */}
      <div className="flex gap-6 items-center">
        <button className="text-black px-2 py-2 xl:px-4 xl:py-2 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 xl:border-2 border-gray-300">
          <div className="flex gap-2 items-center">
            <span className="hidden xl:block">Light Mode</span>{" "}
            <BsSun className="text-2xl" />
          </div>
        </button>
        <Link to="/about" className="text-black hover:underline xl:text-lg">
          About
        </Link>
        <Link
          to="/request-school"
          className="text-black hover:underline xl:text-lg"
        >
          Request School
        </Link>
        <Link to="/login" className="text-black hover:underline xl:text-lg">
          Login
        </Link>
        <Link to="/register" className="text-black hover:underline xl:text-lg">
          Register
        </Link>
      </div>
    </header>
  )
}

export default Navbar
