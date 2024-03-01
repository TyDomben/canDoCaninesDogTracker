import React from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

const LoginPage = () => {
  // Function to handle the sign in process
  const handleSignIn = () => {
    // Implementation for sign in
  };

  // Function to handle navigation to the registration page
  const handleNavigateToRegister = () => {
    // Implementation to navigate to registration
  };

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Can Do Canines
        </Typography>
        <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
            onClick={handleNavigateToRegister}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
