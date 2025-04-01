import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "../components/Login";
import Register from "../components/Register";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routing;

{
  /* <Route element={<AuthLayout />}>
  <Route path="login" element={<Login />} />
  <Route path="register" element={<Register />} />
</Route>

<Route path="concerts">
  <Route index element={<ConcertsHome />} />
  <Route path=":city" element={<City />} />
  <Route path="trending" element={<Trending />} />
</Route> */
}
