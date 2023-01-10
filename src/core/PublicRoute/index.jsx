import { Navigate } from "react-router-dom";

import { privatePaths } from "configs/routePaths";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("user")) {
    return <Navigate to={privatePaths.home} replace />;
  }

  return children;
};

export default PublicRoute;
