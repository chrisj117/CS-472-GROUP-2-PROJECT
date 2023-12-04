/* eslint-disable react-refresh/only-export-components */

import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { createContext, useContext, useMemo, useState } from "react"

const DarkContext = createContext()

const Root = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = window.localStorage.getItem("DARK_MODE")
    return storedDarkMode !== null ? storedDarkMode : "false"
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

  const value = useMemo(
    () => ({
      darkMode,
    }),
    [darkMode]
  )

  return (
    <main className={`${darkMode == "true" ? "dark" : ""} bg-white`}>
      <DarkContext.Provider value={value}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Outlet />
      </DarkContext.Provider>
    </main>
  )
}

export const useDarkMode = () => {
  return useContext(DarkContext)
}

export default Root
