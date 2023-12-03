/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const UnProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/" />
  }

  return children
}
export default UnProtectedRoute
