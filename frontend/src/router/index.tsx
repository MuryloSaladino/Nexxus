import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import { Routes } from "@/constants/routes";
import RouteProtection from "@/components/RouteProtection";
import Home from "@/pages/Home";
import NotFound from "@/components/NotFound";
import SolutionDetails from "@/pages/SolutionDetails";
import Dashboard from "@/pages/Dashboard";

const router = createBrowserRouter([
    {
        path: Routes.NOT_FOUND,
        element: <NotFound/>
    },
    {
        path: Routes.LOGIN,
        element: <Login/> 
    },
    {
        path: "/",
        element: <RouteProtection/>,
        children: [
            {
                path: Routes.HOME,
                element: <Home/>
            },
            {
                path: Routes.SOLUTION_DETAILS,
                element: <SolutionDetails/>
            },
            {
                path: Routes.DASHBOARD,
                element: <Dashboard/>
            }
        ]
    }
])

export default router