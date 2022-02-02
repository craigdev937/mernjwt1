import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Register } from "../containers/Register";
import { Login } from "../containers/Login";
import { Dashboard } from "../components/Dashboard";

export const Main = () => (
    <BrowserRouter>
        <React.Fragment>
            <Routes>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </React.Fragment>
    </BrowserRouter>
);




