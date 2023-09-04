import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ProtectedRouteComponent from "./components/ProtectedRoute";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/forgot-password" element = { <ForgotPassword/>}></Route>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/protected" element = {<ProtectedRouteComponent/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
