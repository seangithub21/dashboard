import { Navigate } from "react-router-dom";

import { publicPaths } from "configs/routePaths";
import Layout from "components/Layout";

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to={publicPaths.login} replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
