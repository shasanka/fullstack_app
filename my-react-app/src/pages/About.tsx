import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../context/AuthContext'

const About = () => {
  const {
    logout
  } = useAuth()
  return (
    
    <Stack>
      <Typography>About page</Typography>
      <Button variant='contained' onClick={logout}>Logout</Button>
    </Stack>
  )
}

export default About