import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LinearProgress } from "@mui/material";

import { publicPaths, privatePaths } from "configs/routePaths";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const LoginPage = lazy(() => import("pages/LoginPage"));
const StockPage = lazy(() => import("pages/StockPage"));
const Page404 = lazy(() => import("pages/Page404"));

const publicRoutes = [{ path: publicPaths.login, Component: <LoginPage /> }];

const privateRoutes = [
  {
    path: privatePaths.stock,
    Component: <StockPage />,
  },
  {
    path: "/",
    Component: <Navigate to={privatePaths.stock} replace />,
  },
  {
    path: "*",
    Component: <Page404 />,
  },
];

const App = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PublicRoute>{route.Component}</PublicRoute>}
          />
        ))}
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.Component}</ProtectedRoute>}
          />
        ))}
        <Route path="*" element={<Navigate to={publicPaths.login} replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
