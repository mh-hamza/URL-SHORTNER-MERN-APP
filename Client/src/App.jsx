import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import RedirectHandler from "./components/RedirectHandler.jsx";
import UrlTrackReport from "./components/UrlTrackReport.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/url/:id" element={<UrlTrackReport />} />
        </Route>

        
        <Route path="/:id" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
