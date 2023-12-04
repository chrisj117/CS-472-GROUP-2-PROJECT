import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { createContext, useContext, useMemo, useState } from "react"

const SchoolContext = createContext()

const Root = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = window.localStorage.getItem("DARK_MODE")
    return storedDarkMode !== null ? storedDarkMode : "false"
  })

  const [currentSchool, setCurrentSchool] = useState(null)

  const toggleDarkMode = () => {
    if (window.localStorage.getItem("DARK_MODE") == "true") {
      window.localStorage.setItem("DARK_MODE", "false")
      setDarkMode("false")
    } else {
      window.localStorage.setItem("DARK_MODE", "true")
      setDarkMode("true")
    }
  }

  const value = useMemo(
    () => ({
      currentSchool,
      setCurrentSchool,
    }),
    [currentSchool]
  )

  return (
    <main className={`${darkMode == "true" ? "dark" : ""} bg-white`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <SchoolContext.Provider value={value}>
        <Outlet />
      </SchoolContext.Provider>
    </main>
  )
}

export const useSchool = () => {
  return useContext(SchoolContext)
}

export default Root
