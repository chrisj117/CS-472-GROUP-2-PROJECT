/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { BsMoon, BsSun } from "react-icons/bs"
import { MdSchool } from "react-icons/md"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdClose } from "react-icons/io"
import { useState } from "react"
import { useAuth } from "../utilities/AuthProvider"

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false)
  const { user, username } = useAuth()

  return (
    <nav>
      <div className="py-6 xl:px-10 px-6 flex justify-between items-center border-b-2 border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div>
            <span className="hidden xl:inline-block text-4xl font-extrabold">
              MyCourse
            </span>
            <span className="hidden xl:inline-block text-blue-600 text-4xl font-extrabold">
              Evaluation
            </span>
          </div>
          <MdSchool className="text-5xl xl:text-4xl" />
        </Link>
        {/* Top Right Corner */}
        <div className="hidden md:flex gap-6 items-center">
          <button
            className="px-2 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600"
            onClick={() => toggleDarkMode()}
          >
            {darkMode == "true" ? (
              <BsMoon fontSize={20} />
            ) : (
              <BsSun fontSize={20} />
            )}
          </button>
          <Link to="/about" className="hover:underline xl:text-lg">
            About
          </Link>
          <Link to="/request-school" className="hover:underline xl:text-lg">
            Request School
          </Link>

          {user ? (
            <div className="flex gap-4 items-center justify-center">
              <p className="xl:text-lg">
                Welcome, <span className="font-semibold">{username}</span>
              </p>

              <button className="rounded-md bg-black dark:bg-white dark:text-black text-white px-3 py-1 hover:bg-red-700 dark:hover:bg-red-700 dark:hover:text-white">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:underline xl:text-lg">
              Login
            </Link>
          )}
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
        <div className="flex flex-col gap-6 md:hidden justify-center items-center py-6 border-b-2 border-gray-300 dark:border-gray-600">
          <button
            className="px-2 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600"
            onClick={() => toggleDarkMode()}
          >
            {darkMode == "true" ? (
              <BsMoon fontSize={20} />
            ) : (
              <BsSun fontSize={20} />
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

          {user ? (
            <div className="flex flex-col gap-4">
              <p className="xl:text-lg">
                Welcome, <span className="font-semibold">{username}</span>
              </p>

              <button className="rounded-md bg-red-600 text-white px-4 py-2 hover:bg-red-700">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => setHamburgerMenu(false)}>
              <Link to="/login" className="hover:underline xl:text-lg">
                Login
              </Link>
            </button>
          )}
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
