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
import Popup from "reactjs-popup"
import { FaChevronDown } from "react-icons/fa"
import { IoMdPerson } from "react-icons/io"

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false)
  const { user, username, authProviderLogout } = useAuth()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    if (!loading) setLoading(true)
    else return

    setTimeout(() => {
      authProviderLogout()
      navigate(0)
      setLoading(false)
    }, 1000)
  }

  return (
    <nav>
      <div className="py-6 xl:px-8 px-6 flex justify-between items-center border-b-2 border-zinc-200 dark:border-zinc-700">
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
          <MdSchool className="text-5xl xl:text-5xl" />
        </Link>
        {/* Top Right Corner */}
        <div className="hidden md:flex gap-5 items-center">
          <button
            className="px-2 py-2 rounded-lg border-zinc-300 dark:border-zinc-600"
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
            <Popup
              trigger={
                <p className="border-2 border-zinc-300 dark:border-zinc-600 rounded-md px-4 py-2">
                  <span className="font-bold flex gap-2 items-center justify-center">
                    <span className="overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[200px]">
                      {username}
                    </span>
                    <FaChevronDown className="text-sm" />
                  </span>
                </p>
              }
              position="bottom right"
              on="click"
              closeOnDocumentClick
              mouseLeaveDelay={300}
              mouseEnterDelay={0}
              contentStyle={{ padding: "0px", border: "none" }}
              arrow={false}
            >
              <div className={`w-[180px] flex flex-col py-1`}>
                <Link
                  to="profile"
                  className={`px-3 py-2 outline-none rounded-t-lg flex gap-1 items-center justify-between w-full ${
                    darkMode == "true"
                      ? "bg-zinc-600 hover:bg-zinc-700 text-white"
                      : "bg-zinc-200 hover:bg-zinc-400"
                  }`}
                >
                  Profile <IoMdPerson className="text-lg" />
                </Link>
                <button
                  className="rounded-b-lg bg-red-600 dark:text-white text-white px-3 py-2 hover:bg-red-700 dark:hover:text-white"
                  onClick={handleLogout}
                >
                  {loading ? (
                    <div className="py-0.5 flex items-center justify-center">
                      <BeatLoader color="#ffffff" size="8px" />
                    </div>
                  ) : (
                    <div className="flex gap-1 justify-between w-full items-center">
                      <>Logout</> <MdLogout className="text-lg" />
                    </div>
                  )}
                </button>
              </div>
            </Popup>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
        <div className="flex gap-4 justify-center items-center md:hidden">
          {user ? (
            <Popup
              trigger={
                <p className="border-2 border-zinc-300 dark:border-zinc-600 rounded-md px-4 py-2">
                  <span className="font-bold flex gap-2 items-center justify-center">
                    <span className="overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[140px]">
                      {username}
                    </span>
                    <FaChevronDown className="text-sm" />
                  </span>
                </p>
              }
              position="bottom right"
              on="hover"
              closeOnDocumentClick
              mouseLeaveDelay={300}
              mouseEnterDelay={0}
              contentStyle={{ padding: "0px", border: "none" }}
              arrow={false}
            >
              <div className={`w-[140px] flex flex-col py-1`}>
                <Link
                  to="profile"
                  className={`px-3 py-2 rounded-t-lg outline-none flex gap-1 items-center justify-between w-full ${
                    darkMode == "true"
                      ? "bg-zinc-600 hover:bg-zinc-700 text-white"
                      : "bg-zinc-300 hover:bg-zinc-400"
                  }`}
                >
                  Profile <IoMdPerson className="text-lg" />
                </Link>
                <button
                  className="rounded-b-lg bg-red-600 dark:text-white text-white px-3 py-2 hover:bg-red-700 dark:hover:text-white flex"
                  onClick={handleLogout}
                >
                  {loading ? (
                    <div className="py-0.5 flex items-center justify-center">
                      <BeatLoader color="#ffffff" size="8px" />
                    </div>
                  ) : (
                    <div className="flex gap-1 justify-between w-full items-center  ">
                      <>Logout</> <MdLogout className="text-lg" />
                    </div>
                  )}
                </button>
              </div>
            </Popup>
          ) : null}
          <button
            onClick={() => setHamburgerMenu(!hamburgerMenu)}
            className="flex items-center justify-center text-center gap-5"
          >
            {hamburgerMenu ? (
              <IoMdClose fontSize={40} />
            ) : (
              <GiHamburgerMenu fontSize={40} />
            )}
          </button>
        </div>
      </div>
      {hamburgerMenu ? (
        <div className="flex flex-col gap-6 md:hidden justify-center items-center py-6 border-b-2 border-zinc-300 dark:border-zinc-600">
          <button
            className="px-2 py-2 rounded-lg border-zinc-300 dark:border-zinc-600"
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

          {user ? null : (
            <button onClick={() => setHamburgerMenu(false)}>
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
