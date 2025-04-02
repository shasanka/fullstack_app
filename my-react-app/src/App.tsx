import { Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { logout } = useAuth();
  return (
    <>
      <Stack padding={2}>
        <Typography variant="h1">App main</Typography>
        <Stack direction="row" spacing={1}>
          <Button component={RouterLink} to="/about">
            About
          </Button>
          <Button component={RouterLink} to="/dashboard">
            Dashboard
          </Button>
          <Button variant="text" color="error" onClick={logout}>
            Logout
          </Button>
        </Stack>
        <Outlet />{" "}
        {/* This will render About, Dashboard, or the index content */}
      </Stack>
    </>
  );
};

export default App;
