// ref: cat-collector classwork code
import React from "react"
import { getUserFromToken } from "../../lib/auth"
import { Navigate } from "react-router"

export default function ProtectedRoute({ children }) {
  const user = getUserFromToken()
  if (!user) return <Navigate to="/login" replace />
  return children
}

// added protected route file to CatDetail