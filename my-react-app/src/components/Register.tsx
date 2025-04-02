import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

type User = {
  email: string;
  username: string;
  password: string;
};

const Register = () => {
  const [user, setUser] = useState<User>({
    email: "",
    username: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    console.log("User data:", user);
    // Handle login logic here
    console.log("Login clicked");
  };
  return (
    <>
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
            {/* <img
              src="assets/images/logo.png" // Replace with your logo URL
              alt="App Logo"
              style={{ width: 80, height: 80 }}
            /> */}
            <Typography variant="h5" color="primary" fontWeight="bold">
              Visuals
            </Typography>
          </Stack>

          {/* Login Form */}
          <Stack spacing={2}>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleChange}
              sx={{ backgroundColor: "#2c2c2c", borderRadius: 1 }}
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleChange}
              sx={{ backgroundColor: "#2c2c2c", borderRadius: 1 }}
            />
            <TextField
              label="Password"
              name="password"
              variant="outlined"
              size="small"
              type="password"
              fullWidth
              onChange={handleChange}
              sx={{ backgroundColor: "#2c2c2c", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              onClick={() => handleRegister}
              color="primary"
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: 3,
                mt: 1,
              }}
            >
              Signup
            </Button>
            <Typography variant="body2" color="text.secondary">
              Have an account? <a href="/login">Login</a>
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
          backgroundImage: `url('/assets/images/img1.jpg')`, // Replace with your image URL
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
    </>
  );
};

export default Register;
