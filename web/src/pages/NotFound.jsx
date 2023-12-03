import { useState } from "react"
import Navbar from "../components/Navbar"
import ReturnHome from "../components/ReturnHome"

const NotFound = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = window.localStorage.getItem("DARK_MODE")
    return storedDarkMode !== null ? storedDarkMode : false
  })

  const toggleDarkMode = () => {
    if (window.localStorage.getItem("DARK_MODE") == "true") {
      window.localStorage.setItem("DARK_MODE", "false")
      setDarkMode("false")
    } else {
      window.localStorage.setItem("DARK_MODE", "true")
      setDarkMode("true")
    }
  }

  return (
    <div className={`${darkMode == "true" ? "dark" : ""} bg-white`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-col min-h-[calc(100vh-98px)] items-center">
        <h2 className="mt-8 text-3xl font-bold text-center">404</h2>
        <p className="text-center mt-64 text-xl">
          The page you have requested cannot be found.
        </p>
        <div className="flex flex-col items-center w-screen">
          <ReturnHome />
        </div>
      </div>
    </div>
  )
}

export default NotFound
