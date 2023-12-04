import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./index.css"

import Root from "./pages/Root.jsx"
import NotFound from "./pages/NotFound.jsx"
import School, { loader as schoolLoader } from "./pages/School.jsx"
import About from "./pages/About.jsx"
import RequestSchool from "./pages/RequestSchool"
import Review from "./pages/Review"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthProvider } from "./utilities/AuthProvider"
import UnProtectedRoute from "./utilities/UnProtectedRoute"
import ProtectedRoute from "./utilities/ProtectedRoute"
import Profile from "./pages/Profile"
import PasswordReset from "./pages/PasswordReset.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Root />
      </AuthProvider>
    ),
    errorElement: (
      <AuthProvider>
        <NotFound />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "request-school", element: <RequestSchool /> },
      {
        path: "login",
        element: (
          <UnProtectedRoute>
            <Login />
          </UnProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <UnProtectedRoute>
            <Register />
          </UnProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "password-reset",
        element: (
          <ProtectedRoute>
            <PasswordReset />
          </ProtectedRoute>
        ),
      },
      // TEMPORARY: Review page quick access
      {
        path: "review",
        element: <Review />,
      },
      // TEMPORARY: Review page quick access
      // TEMPORARY: School page quick access
      {
        path: "school",
        element: <School />,
      },
      {
        path: "schools/:schoolId",
        element: <School />,
        loader: schoolLoader,
        children: [
          {
            path: "review",
            element: <Review />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
