import { createContext, useContext, useMemo } from "react"
import useLocalStorage from "./useLocalStorage"
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("token", null)
  const [username, setUsername] = useLocalStorage("username", null)

  const authProviderLogin = (token, username) => {
    if (token) {
      setUser(token)
      setUsername(username)
    }
  }

  const authProviderLogout = (token) => {
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
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
