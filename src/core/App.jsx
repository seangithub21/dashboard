import { createContext, lazy, Suspense, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  LinearProgress,
  createTheme,
  useMediaQuery,
} from "@mui/material";

import { ToastContainer } from "react-toastify";

import baseTheme, { darkMode, mobile } from "configs/theme";
import { publicPaths, privatePaths } from "configs/routePaths";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const LoginPage = lazy(() => import("pages/LoginPage"));
const StocksPage = lazy(() => import("pages/StocksPage"));
const CompanyDetailsPage = lazy(() => import("pages/CompanyDetailsPage"));
const CryptoPage = lazy(() => import("pages/CryptoPage"));
const CryptoDetailsPage = lazy(() => import("pages/CryptoDetailsPage"));
const CurrencyConverterPage = lazy(() => import("pages/CurrencyConverterPage"));
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
    path: privatePaths.currencyConverter,
    Component: <CurrencyConverterPage />,
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

export const ColorModeContext = createContext(null);

const App = () => {
  const [themeMode, setThemeMode] = useState("light");
  const isMobile = useMediaQuery("(max-width:600px)");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          mode: themeMode,
          ...(themeMode === "light" ? baseTheme.palette : darkMode.palette),
        },
        typography: {
          ...(isMobile ? mobile.typography : baseTheme.typography),
        },
      }),
    [themeMode, isMobile]
  );

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer position="top-center" limit={2} />
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
              <Route
                path="*"
                element={<Navigate to={publicPaths.login} replace />}
              />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
};

export default App;
