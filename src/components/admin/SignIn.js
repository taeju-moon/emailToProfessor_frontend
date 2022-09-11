import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import useAuth from '../../hooks/useAuth';

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const loginPayload = {
      user_id: event.currentTarget.user_id.value,
      password: event.currentTarget.password.value,
    };

    useAuth.login(loginPayload.user_id, loginPayload.password);

    // axios
    //   .post('https://reqres.in/api/login', loginPayload)
    //   .then((response) => {
    //     //get token from response
    //     const token = response.data.token;

    //     //set JWT token to local
    //     localStorage.setItem('token', token);

    //     //set token to axios common header
    //     // setAuthToken(token);

    //     //redirect user to home page
    //     window.location.href = '/';
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user_id"
            label="user_id"
            name="user_id"
            autoComplete="user_id"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
