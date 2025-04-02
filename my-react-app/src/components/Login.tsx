import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/utils";

type User = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  // const [user, setUser] = useState<User>({
  //   email: "shasanka@gmail.com",
  //   password: "1234",
  // });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    let emailError = validateEmail(user.email);
    let passwordError = validatePassword(user.password);

    setErrors({ email: emailError, password: passwordError });
    if (!emailError && !passwordError) {
      login({
        email: user.email,
        password: user.password,
      });
    }
    // Proceed with login logic
  };

  return (
    <Grid container sx={{ height: "100vh", backgroundColor: "#121212" }}>
      {/* Left Section with Image */}

      {/* Right Section with Form */}
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: "80%",
            maxWidth: "400px",
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "#1e1e1e", // Slightly lighter than the main background
          }}
        >
          {/* Logo and App Name */}
          <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Typography variant="h5" color="primary" fontWeight="bold">
              Visuals
            </Typography>
          </Stack>

          {/* Login Form */}
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
              value={user.email}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              sx={{ backgroundColor: "#2c2c2c", borderRadius: 1 }}
            />
            <TextField
              label="Password"
              name="password"
              variant="outlined"
              size="small"
              type="password"
              value={user.password}
              error={!!errors.password}
              helperText={errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              sx={{ backgroundColor: "#2c2c2c", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleLogin}
              color="primary"
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: 3,
                mt: 1,
              }}
            >
              Login
            </Button>
            <Typography variant="body2" color="text.secondary">
              Don't have an account? <a href="/register">Register</a>
            </Typography>
          </Stack>
        </Paper>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/assets/images/img1.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default Login;
