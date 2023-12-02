/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const ProtectedRoute = ({ children, redirect }) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to={`${redirect}`} />
  }
  return children
}
export default ProtectedRoute
