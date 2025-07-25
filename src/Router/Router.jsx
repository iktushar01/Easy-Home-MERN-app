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
import WishList from "../Pages/UserPages/WishList/WishList";
import MyReview from "../Pages/UserPages/MyReview/MyReview";
import Profile from "../Pages/AdminPages/Profile/Profile";
import ManageReviews from "../Pages/AdminPages/Profile/ManageReviews";
import ManageProperty from "../Pages/AdminPages/ManageProperty/ManageProperty";
import ManageUser from "../Pages/AdminPages/ManageUser/ManageUser";
import About from "../Pages/About/About";
import MakeOffer from "../Pages/UserPages/WishList/MakeOffer";
import PropertyBought from "../Pages/UserPages/PropertyBought/PropertyBought";
import Pay from "../Pages/UserPages/PropertyBought/Pay";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "properties",
        element: (
          <PrivateRoute>
            <AllProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "properties/:id",
        element: (
          <PrivateRoute>
            <AllPropertiesDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin",
        element: <AdminDashBoard />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "manage-reviews",
            element: <ManageReviews />,
          },
          {
            path: "manage-properties",
            element: <ManageProperty />,
          },
          {
            path: "manage-users",
            element: <ManageUser />,
          },
        ],
      },
      {
        path: "agent",
        element: <AgentDashBoard />,
        children: [
          {
            index: true,
            element: <AgentProfile />,
          },
          {
            path: "profile",
            element: <AgentProfile />,
          },
          {
            path: "add-property",
            element: <AddProperty />,
          },
          {
            path: "my-properties",
            element: <MyProperty />,
          },
          {
            path: "sold-properties",
            element: <SoldProperties />,
          },
          {
            path: "requested-properties",
            element: <RequestedProperties />,
          },
        ],
      },
      {
        path: "user",
        element: <UserDashBoard />,
        children: [
          {
            index: true,
            element: <MyProfile />,
          },
          {
            path: "profile",
            element: <MyProfile />,
          },
          {
            path: "wishlist",
            element: <WishList />,
          },
          {
            path: "reviews",
            element: <MyReview />,
          },
          {
            path: "make-offer/:id",
            element: <MakeOffer />,
          },
          {
            path: "payment/:id",
            element: <Pay />,
          },
          {
            path: "bought",
            element: <PropertyBought />,
          },
        ],
      },
    ],
  },
]);
