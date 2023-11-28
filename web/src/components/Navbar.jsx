import { Link } from "react-router-dom"
import { BsMoon, BsSun } from "react-icons/bs"
import { MdSchool } from "react-icons/md"
import { useEffect } from "react"

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="py-6 px-10 flex justify-between items-center border-b-2 border-zinc-200">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <div>
          <span className="text-4xl font-extrabold">MyCourse</span>
          <span className="text-blue-600 text-4xl font-extrabold">
            Evaluation
          </span>
        </div>
        <MdSchool fontSize={36} />
      </Link>
      {/* Top Right Corner */}
      <div className="flex gap-6 items-center">
        <button
          className="px-4 py-2 rounded-lg hover:bg-zinc-900 hover:text-white hover:border-zinc-900 border-2 border-zinc-300"
          onClick={() => toggleDarkMode()}
        >
          {darkMode == "true" ? (
            <div className="flex gap-2 items-center">
              <span className="">Dark Mode</span> <BsMoon fontSize={21} />
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <span className="">Light Mode</span> <BsSun fontSize={21} />
            </div>
          )}
        </button>
        <Link to="/about" className="hover:underline text-lg">
          About
        </Link>
        <Link to="/request-school" className="hover:underline text-lg">
          Request School
        </Link>
        <Link to="/login" className="hover:underline text-lg">
          Login
        </Link>
        <Link to="/register" className="hover:underline text-lg">
          Register
        </Link>
      </div>
    </header>
  )
}

export default Navbar
