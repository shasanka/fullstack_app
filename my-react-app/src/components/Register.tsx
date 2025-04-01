import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

type User = {
  email: string;
  username: string;
  password: string;
};

const Register = ()=> {
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
    <Stack spacing={2} sx={{height:'100vh', backgroundColor:'#f0f0f0', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Stack spacing={2} sx={{ width:'50%' , maxWidth:'400px'}}>
        <TextField label="Email" name="email" variant="outlined" size="small"  onChange={handleChange}/>
        <TextField label="Username" name="username" variant="outlined" size="small" onChange={handleChange} />
        <TextField label="Password" name="password" variant="outlined" size="small" onChange={handleChange} />
        <Button variant="contained" onClick={handleRegister}>Register</Button>
      </Stack>
    </Stack>
    </>
  );
}


export default Register