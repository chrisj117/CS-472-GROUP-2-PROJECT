/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */

import { createContext, useContext, useMemo } from "react"
import useLocalStorage from "./useLocalStorage"
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("token", null)
  const [username, setUsername] = useLocalStorage("username", null)
  const [email, setEmail] = useLocalStorage("email", null)

  const authProviderLogin = (token, username, email) => {
    setUser(token)
    setUsername(username)
    setEmail(email)
  }

  const authProviderLogout = () => {
    setUser(null)
    setUsername(null)
    setEmail(null)
  }

  const value = useMemo(
    () => ({
      user,
      username,
      email,
      authProviderLogin,
      authProviderLogout,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
