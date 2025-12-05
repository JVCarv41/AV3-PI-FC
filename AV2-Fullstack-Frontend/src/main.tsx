import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorPage from "./pages/Error/ErrorPage";
import AuthPage from "./pages/authPage/AuthPage";
import ProtectedRoute from "./pages/authPage/ProtectedRoute";
import UserPage from "./pages/userArea/UserPage";

const ProtectedLayout = () => (
  <ProtectedRoute>
    <Outlet />
  </ProtectedRoute>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shopping-list",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <UserPage /> },
      { path: ":id", element: <UserPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
