import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
    ]
  },
  {
    path: "/",
    element: <AuthLayout/>,
    children: [
      {
        path:"/login",
        element:<Login/>
      }
    ]
  }
]);