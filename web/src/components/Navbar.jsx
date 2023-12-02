/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom"
import { BsMoon, BsSun } from "react-icons/bs"
import { MdSchool } from "react-icons/md"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdClose } from "react-icons/io"
import { useState } from "react"
import { useAuth } from "../utilities/AuthProvider"
import { BeatLoader } from "react-spinners"
import { MdLogout } from "react-icons/md"

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false)
  const { user, username, authProviderLogout } = useAuth()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    setLoading(true)

    setTimeout(() => {
      authProviderLogout()
      navigate(0)
      setLoading(false)
    }, 1000)
  }

  return (
    <nav>
      <div className="py-6 xl:px-8 px-6 flex justify-between items-center border-b-2 border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div>
            <span className="hidden xl:inline-block text-3xl font-extrabold">
              MyCourse
            </span>
            <span className="hidden xl:inline-block text-blue-600 text-3xl font-extrabold">
              Evaluation
            </span>
          </div>
          <MdSchool className="text-5xl xl:text-4xl" />
        </Link>
        {/* Top Right Corner */}
        <div className="hidden md:flex gap-5 items-center">
          <button
            className="px-2 py-2 rounded-lg border-gray-300 dark:border-gray-600"
            onClick={() => toggleDarkMode()}
          >
            {darkMode == "true" ? (
              <BsMoon fontSize={20} />
            ) : (
              <BsSun fontSize={20} />
            )}
          </button>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/request-school" className="hover:underline">
            Request School
          </Link>

          {user ? (
            <div className="flex gap-4 items-center justify-center">
              <p>
                <span className="font-bold">Hello, </span>
                {username}!
              </p>

              <button
                className="rounded-md bg-red-600 dark:text-white text-white px-2 py-1.5 hover:bg-red-600 dark:hover:text-white flex items-center justify-center"
                onClick={handleLogout}
              >
                {loading ? (
                  <div className="py-0.5 flex items-center justify-center">
                    <BeatLoader color="#ffffff" size="8px" />
                  </div>
                ) : (
                  <MdLogout className="text-xl" />
                )}
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
        <div className="inline-block md:hidden">
          <button
            onClick={() => setHamburgerMenu(!hamburgerMenu)}
            className="flex items-center justify-center text-center gap-5"
          >
            {user ? (
              <p className="">
                <span className="font-bold">Hello, </span>
                {username}!
              </p>
            ) : null}
            {hamburgerMenu ? (
              <IoMdClose fontSize={40} />
            ) : (
              <GiHamburgerMenu fontSize={40} />
            )}
          </button>
        </div>
      </div>
      {hamburgerMenu ? (
        <div className="flex flex-col gap-6 md:hidden justify-center items-center py-6 border-b-2 border-gray-300 dark:border-gray-600">
          <button
            className="px-2 py-2 rounded-lg border-gray-300 dark:border-gray-600"
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
            <div className="flex flex-col gap-5">
              <button
                className="rounded-md bg-red-600 dark:text-white text-white px-2 py-1.5 hover:bg-red-600 dark:hover:text-white flex items-center justify-center"
                onClick={handleLogout}
              >
                {loading ? (
                  <BeatLoader color="#ffffff" size="14px" />
                ) : (
                  <MdLogout className="text-xl" />
                )}
              </button>
            </div>
          ) : (
            <button onClick={() => setHamburgerMenu(false)} className="mt-4">
              <Link to="/login" className="hover:underline">
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
