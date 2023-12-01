/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useMemo } from "react"
import useLocalStorage from "./useLocalStorage"
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("token", null)
  const [username, setUsername] = useLocalStorage("username", null)

  const authProviderLogin = (token, username) => {
    setUser(token)
    setUsername(username)
  }

  const authProviderLogout = () => {
    setUser(null)
    setUsername(null)
  }

  const value = useMemo(
    () => ({
      user,
      username,
      authProviderLogin,
      authProviderLogout,
    }),
    [user, username]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
