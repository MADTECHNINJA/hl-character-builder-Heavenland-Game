import { Navigate } from 'react-router-dom'
const Protected = ({ avatarUrl, children }) => {
  if (!avatarUrl) {
    return <Navigate to='/' replace />
  }
  return children
}
export default Protected
