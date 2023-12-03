import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useState } from "react"
import { AuthProvider } from "../utilities/AuthProvider"

const Root = () => {
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
    <main className={`${darkMode == "true" ? "dark" : ""} bg-white`}>
      <AuthProvider>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Outlet />
      </AuthProvider>
    </main>
  )
}

export default Root
