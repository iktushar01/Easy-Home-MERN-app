import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import AgentDashBoard from "../Pages/DashBoard/AgentDashBoard";
import AdminDashBoard from "../Pages/DashBoard/AdminDashBoard";
import UserDashBoard from "../Pages/DashBoard/UserDashBoard";
import PrivateRoute from "../Routes/PrivateRoute";
import MyProfile from "../Pages/UserPages/MyProfile/MyProfile";
import AgentProfile from "../Pages/AgentPages/AgentProfile/AgentProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "admin",
        element: <AdminDashBoard />,
        
      },
      { path: "agent",
        element: <AgentDashBoard />,
        children: [
          {
            path:"profile",
            element:<AgentProfile/>,
          }
        ]

      },
      { path: "user",
        element: <UserDashBoard />,
        children: [
          {
            path: "profile",
            element: <MyProfile />,
          },
        ]
      },
    ],
  },
]);
