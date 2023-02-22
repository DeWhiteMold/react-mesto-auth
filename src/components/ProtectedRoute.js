import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({element, ...props}) => {
  return props.isLogged ? element : <Navigate to="/sing-in" replace />
}

export default ProtectedRouteElement;