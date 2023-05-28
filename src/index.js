import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NepaliUtils from "@mui/lab/AdapterDayjs"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
      </LocalizationProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
