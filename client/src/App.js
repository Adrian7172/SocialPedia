
import LoginPage from "pages/loginPage";
import HomePage from "pages/homePage";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import React, { Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, Container, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from "pages/registerPage";
import Navbar from "components/Navbar";
import Leftbar from "components/Leftbar";
import Rightbar from "components/Rightbar";
import PeoplePage from "pages/peoplePage";
import FriendsPage from "pages/friendsPage";
import SearchResult from "components/SearchResult";

const ProfilePage = React.lazy(() => import("pages/profilePage"))

function App() {
  const mode = useSelector(state => state.persistedReducer.user.mode);
  const user = useSelector(state => Boolean(state.persistedReducer.user.token));
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
        , {
          path: "/friends",
          element: <ProtectedRoute><FriendsPage /></ProtectedRoute>,
        }
        , {
          path: "/profile/:id",
          element: <Suspense fallback={<Box flex={8}>Loading...</Box>}><ProtectedRoute><ProfilePage /></ProtectedRoute></Suspense>,
        }
        , {
          path: "/search/:name",
          element: <ProtectedRoute><SearchResult /></ProtectedRoute>,
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
