import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import SignUp_SignIn from "../Pages/SignUp_SignIn";
import Forbidden from "../Component/Forbidden/Forbidden";
import RoleBasedRedirect from "../Pages/Dashboard/RoleBasedRedirect/RoleBasedRedirect";
import UserDashboard from "../Pages/Dashboard/UserDashboard/UserDashboard";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import ModeratorDashboard from "../Pages/Dashboard/ModeratorDashboard/ModeratorDashboard";
import PrivateRoute from "./PrivateRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile";
import MyApplication from "../Pages/Dashboard/UserDashboard/MyApplication";
import MyReviews from "../Pages/Dashboard/UserDashboard/MyReviews";
import ManageScholarships from "../Pages/Dashboard/ModeratorDashboard/ManageScholarships";
import AllReviews from "../Pages/Dashboard/ModeratorDashboard/AllReviews";
import AddScholarship from "../Pages/Dashboard/ModeratorDashboard/AddScholarship";
import ManageAppliedApplication from "../Pages/Dashboard/AdminDashboard/ManageAppliedApplication";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";
import AllScholarship from "../Pages/AllScholarship";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import ApplyScholarship from "../Component/ApplyScholarship/ApplyScholarship";
import Payment from "../Component/Payment/Payment";
import Overview from "../Pages/Dashboard/AdminDashboard/Overview";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/signUp-signIn",
                element: <SignUp_SignIn></SignUp_SignIn>
            },
            {
                path: "/allScholarship",
                element: <AllScholarship></AllScholarship>
            },
            {
                path: "/scholarships/:id",
                element: <PrivateRoute><ScholarshipDetails></ScholarshipDetails></PrivateRoute>
            },
            {
                path: "/applyscholarship/:id",
                element: <PrivateRoute><ApplyScholarship></ApplyScholarship></PrivateRoute>
            },
            {
                path: "/payment/:id",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: "*",
                element: <NotFound></NotFound>
            },
            {
                path: "/forbidden",
                element: <Forbidden />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><RoleBasedRedirect></RoleBasedRedirect></PrivateRoute>
    },
    {
        path: "/dashboard/user",
        element: <RoleProtectedRoute allowedRoles={["user"]}><UserDashboard></UserDashboard></RoleProtectedRoute>,
        children: [
            {
                path: "my-profile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "my-application",
                element: <MyApplication></MyApplication>
            },
            {
                path: "my-reviews",
                element: <MyReviews></MyReviews>
            }
        ]
    },
    {
        path: "/dashboard/admin",
        element: <RoleProtectedRoute allowedRoles={["admin"]}><AdminDashboard></AdminDashboard></RoleProtectedRoute>,
        children: [
            {
                path: "overview",
                element: <Overview></Overview>
            },
            {
                path: "my-profile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "addScholarship",
                element: <AddScholarship></AddScholarship>
            },
            {
                path: "manageScholarships",
                element: <ManageScholarships></ManageScholarships>
            },
            {
                path: "manageAppliedApplication",
                element: <ManageAppliedApplication></ManageAppliedApplication>
            },
            {
                path: "manageUsers",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "manageReview",
                element: <AllReviews></AllReviews>
            }
        ]
    },
    {
        path: "/dashboard/moderator",
        element: <RoleProtectedRoute allowedRoles={["moderator"]}><ModeratorDashboard></ModeratorDashboard></RoleProtectedRoute>,
        children: [
            {
                path: "my-profile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "manageScholarships",
                element: <ManageScholarships></ManageScholarships>
            },
            {
                path: "allReviews",
                element: <AllReviews></AllReviews>
            },
            {
                path: "allAppliedScholarship",
                element: <ManageAppliedApplication></ManageAppliedApplication>
            },
            {
                path: "addScholarship",
                element: <AddScholarship></AddScholarship>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
    }
]);