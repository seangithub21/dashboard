import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LinearProgress } from "@mui/material";

import { publicPaths, privatePaths } from "configs/routePaths";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const LoginPage = lazy(() => import("pages/LoginPage"));
const StocksPage = lazy(() => import("pages/StocksPage"));
const CompanyDetailsPage = lazy(() => import("pages/CompanyDetailsPage"));
const CryptoPage = lazy(() => import("pages/CryptoPage"));
const CryptoDetailsPage = lazy(() => import("pages/CryptoDetailsPage"));
const Page404 = lazy(() => import("pages/Page404"));

const publicRoutes = [{ path: publicPaths.login, Component: <LoginPage /> }];

const privateRoutes = [
  {
    path: privatePaths.stocks,
    Component: <StocksPage />,
  },
  {
    path: privatePaths.companyDetails,
    Component: <CompanyDetailsPage />,
  },
  {
    path: privatePaths.crypto,
    Component: <CryptoPage />,
  },
  {
    path: privatePaths.cryptoDetails,
    Component: <CryptoDetailsPage />,
  },
  {
    path: "/",
    Component: <Navigate to={privatePaths.stocks} replace />,
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
