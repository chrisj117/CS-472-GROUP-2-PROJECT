import { Link } from "react-router-dom"
import { BsSun } from "react-icons/bs"
import { MdSchool } from "react-icons/md"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdClose } from "react-icons/io"
import { useState } from "react"

const Navbar = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false)

  return (
    <nav>
      <div className="bg-white text-black py-6 xl:px-10 px-6 flex justify-between items-center border-b-2 border-gray-200">
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
          <MdSchool className="text-5xl xl:text-2xl xl:text-black" />
        </Link>
        {/* Top Right Corner */}
        <div className="hidden md:flex gap-6 items-center">
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
          <Link
            to="/register"
            className="text-black hover:underline xl:text-lg"
          >
            Register
          </Link>
        </div>
        <div className="inline-block md:hidden">
          <button
            onClick={() => setHamburgerMenu(!hamburgerMenu)}
            className="flex items-center justify-center text-center"
          >
            {hamburgerMenu ? (
              <IoMdClose fontSize={48} />
            ) : (
              <GiHamburgerMenu fontSize={40} />
            )}
          </button>
        </div>
      </div>
      {hamburgerMenu ? (
        <div className="flex flex-col gap-6 md:hidden justify-center items-center py-6 border-b-2 border-gray-200">
          <button className="text-black px-2 py-2 xl:px-4 xl:py-2 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 xl:border-2 border-gray-300">
            <div className="flex gap-2 items-center">
              <span className="hidden xl:block">Light Mode</span>{" "}
              <BsSun className="text-2xl" />
            </div>
          </button>
          <button onClick={() => setHamburgerMenu(false)}>
            <Link to="/about" className="text-black hover:underline xl:text-lg">
              About
            </Link>
          </button>
          <button onClick={() => setHamburgerMenu(false)}>
            <Link
              to="/request-school"
              className="text-black hover:underline xl:text-lg"
            >
              Request School
            </Link>
          </button>
          <button onClick={() => setHamburgerMenu(false)}>
            <Link to="/login" className="text-black hover:underline xl:text-lg">
              Login
            </Link>
          </button>
          <button onClick={() => setHamburgerMenu(false)}>
            <Link
              to="/register"
              className="text-black hover:underline xl:text-lg"
            >
              Register
            </Link>
          </button>
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
