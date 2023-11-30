/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { BsMoon, BsSun } from "react-icons/bs"
import { MdSchool } from "react-icons/md"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdClose } from "react-icons/io"
import { useState } from "react"

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false)

  return (
    <nav>
      <div className="py-6 xl:px-10 px-6 flex justify-between items-center border-b-2 border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div>
            <span className="hidden lg:inline-block text-4xl font-extrabold">
              MyCourse
            </span>
            <span className="hidden lg:inline-block text-blue-600 text-4xl font-extrabold">
              Evaluation
            </span>
          </div>
          <MdSchool className="text-5xl xl:text-4xl" />
        </Link>
        {/* Top Right Corner */}
        <div className="hidden md:flex gap-6 items-center">
          <button
            className="px-2 py-2 xl:px-4 xl:py-2 rounded-lg xl:border-2 border-gray-300 dark:border-gray-600"
            onClick={() => toggleDarkMode()}
          >
            {darkMode == "true" ? (
              <div className="flex gap-2 items-center">
                <span className="hidden xl:inline-block">Dark Mode</span>{" "}
                <BsMoon fontSize={24} />
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <span className="hidden xl:inline-block">Light Mode</span>{" "}
                <BsSun fontSize={24} />
              </div>
            )}
          </button>
          <Link to="/about" className="hover:underline xl:text-lg">
            About
          </Link>
          <Link to="/request-school" className="hover:underline xl:text-lg">
            Request School
          </Link>
          <Link to="/login" className="hover:underline xl:text-lg">
            Login
          </Link>
          <Link to="/register" className="hover:underline xl:text-lg">
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
        <div className="flex flex-col gap-6 md:hidden justify-center items-center py-6 border-b-2 border-gray-200 dark:border-gray-700">
          <button className="px-2 py-1" onClick={() => toggleDarkMode()}>
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

          <button onClick={() => setHamburgerMenu(false)}>
            <Link to="/about" className="hover:underline xl:text-lg">
              About
            </Link>
          </button>
          <button onClick={() => setHamburgerMenu(false)}>
            <Link to="/request-school" className="hover:underline xl:text-lg">
              Request School
            </Link>
          </button>
          <button onClick={() => setHamburgerMenu(false)}>
            <Link to="/login" className="hover:underline xl:text-lg">
              Login
            </Link>
          </button>
          <button onClick={() => setHamburgerMenu(false)}>
            <Link to="/register" className="hover:underline xl:text-lg">
              Register
            </Link>
          </button>
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
