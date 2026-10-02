import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  // TODO: Get user role from auth context/store
  const userRole = localStorage.getItem('userRole') || 'USER'
  const isAuthenticated = localStorage.getItem('token') !== null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
