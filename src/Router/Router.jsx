import { createBrowserRouter } from "react-router-dom";
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
import AddProperty from "../Pages/AgentPages/AddProperty/AddProperty";
import MyProperty from "../Pages/AgentPages/MyProperty/MyProperty";
import SoldProperties from "../Pages/AgentPages/SoldProperties/SoldProperties";
import RequestedProperties from "../Pages/AgentPages/RequestedProperties/RequestedProperties";
import AllProperties from "../Pages/AllProperties/AllProperties";
import AllPropertiesDetails from "../Pages/AllProperties/AllPropertiesDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path:"properties",
        element:<PrivateRoute><AllProperties/></PrivateRoute>,
      },
      {
        path:"properties/:id",
        element:<PrivateRoute><AllPropertiesDetails/></PrivateRoute>,
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
          },
          {
            path: "add-property",
            element:<AddProperty/>,
          },
          {
            path: "my-properties",
            element:<MyProperty/>,
          },
          {
            path: "sold-properties",
            element:<SoldProperties/>,
          },
          {
            path: "requested-properties",
            element:<RequestedProperties/>
          },
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
