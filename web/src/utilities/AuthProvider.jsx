import { useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
const AuthContext = useContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = window.localStorage.setItem("token", null)
  const navigate = useNavigate()

  const authProviderLogin = (token) => {
    if (token) {
      setUser(token)
    }
  }

  const authProviderLogout = (token) => {
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
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
