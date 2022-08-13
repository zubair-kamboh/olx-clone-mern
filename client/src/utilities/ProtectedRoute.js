import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

export const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return children
  }

  return <Navigate to="/" replace />
}
