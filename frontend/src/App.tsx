import "./types/extensions/string.extensions"

import "./styles/global.css"

import { RouterProvider } from "react-router-dom";
import router from "./router";

import { ToastContainer } from "react-toastify";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router}/>
            <ToastContainer position="top-center"/>
        </LocalizationProvider>
    )    
}