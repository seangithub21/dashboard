import { Navigate } from "react-router-dom";

import { publicPaths } from "configs/routePaths";

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to={publicPaths.login} replace />;
  }

  return children;
};

export default ProtectedRoute;
