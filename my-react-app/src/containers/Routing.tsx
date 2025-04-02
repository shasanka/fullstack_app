import {  Route, Routes } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "../components/Login";
import Register from "../components/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "../lib/theme";

const Routing = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          {/* Protected Routes with App as Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          >
            {/* Nested child routes */}
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* Optional: Default route when just "/" is accessed */}
            <Route index element={<div>Welcome to the App!</div>} />
          </Route>
        </Routes>
    </ThemeProvider>
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
