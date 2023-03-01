
import LoginPage from "pages/loginPage";
import HomePage from "pages/homePage";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Container, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from "pages/registerPage";
import Navbar from "components/Navbar";
import Leftbar from "components/Leftbar";
import Rightbar from "components/Rightbar";
import PeoplePage from "pages/peoplePage";

function App() {
  const mode = useSelector(state => state.persistedReducer.mode);
  const user = Boolean(useSelector(state => state.persistedReducer.token));
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  // layout
  const Layout = () => {
    return (
      <React.Fragment>
        <Navbar />
        <Container maxWidth="lg">
          <Stack gap={2} direction="row" alignItems="flex-start" mt="1rem">
            <Leftbar />
            <Outlet />
            <Rightbar />
          </Stack>
        </Container>
      </React.Fragment>
    )
  }


  // protectedRoute
  const ProtectedRoute = ({ children }) => {
    if (!user && !(children.type.name === "LoginPage" || children.type.name === "RegisterPage")) {
      return <Navigate to="/login" />
    }
    if (user && (children.type.name === "LoginPage" || children.type.name === "RegisterPage")) {
      return <Navigate to="/" />
    }
    return children;
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute><HomePage /></ProtectedRoute>,
        }, {
          path: "/peoples",
          element: <ProtectedRoute><PeoplePage /></ProtectedRoute>,
        }
      ]

    },
    {
      path: "/login",
      element: <ProtectedRoute><LoginPage /></ProtectedRoute>
    },
    {
      path: "/register",
      element: <ProtectedRoute><RegisterPage /></ProtectedRoute>
    },

  ])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
