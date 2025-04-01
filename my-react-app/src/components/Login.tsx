import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

type User = {
  email: string;
  password: string;
};

const Login = ()=> {

  const {login} = useAuth()

  const [user, setUser] = useState<User>({
    email: "shasanka@gmail.com",
    password: "1234",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    console.log("User data:", user);
    // Handle login logic here    
    console.log("Login clicked");
    login({
      email:user.email,
      password:user.password
    })
  };
  return (
    <>
    <Stack spacing={2} sx={{height:'100vh', backgroundColor:'#f0f0f0', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Stack spacing={2} sx={{ width:'50%' , maxWidth:'400px'}}>
        <TextField label="Email" name="email" variant="outlined" size="small" onChange={handleChange} value={user.email} />
        <TextField label="Password" name="password" variant="outlined" size="small" onChange={handleChange}  value={user.password}/>
        <Button variant="contained" onClick={handleLogin}>Login</Button>
      </Stack>
    </Stack>
    </>
  );
}


export default Login