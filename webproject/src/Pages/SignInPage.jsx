import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Checkbox, FormControlLabel,
  Divider, IconButton, InputAdornment, Link
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import '../css/AuthPages.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API call or add your sign-in logic here
      navigate('/dashboard');
    }
  };

  return (
    <Box className="main-container">
      <Box className="card">
        <Box className="form-section">

          <Typography variant="h4" gutterBottom fontWeight="bold" color='primary'>Sign in</Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            Please login to continue to your account.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              className="text-field"
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              className="text-field"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox checked={keepLoggedIn} onChange={(e) => setKeepLoggedIn(e.target.checked)} sx={{ color: '#6b7280' }} />
              }
              label="Keep me logged in"
              sx={{ mb: 2, color: '#6b7280' }}
            />

            <Button className="submit-button" fullWidth type="submit" variant="contained" sx={{ mb: 2 }}>Sign In</Button>

            <Divider sx={{ my: 3 }}>or</Divider>

            <Button className="alt-button" fullWidth variant="outlined" startIcon={<Google />} sx={{ mb: 2 }}>Sign in with Google</Button>
            <Button className="alt-button" fullWidth variant="outlined" startIcon={<Facebook />} sx={{ mb: 2 }}>Sign in with Facebook</Button>

            <Typography variant="body2" align="center" color='textSecondary'>
              Need an account?{' '}
              <Link component={RouterLink} to="/signup" underline="hover" color="primary">
                Create one
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box className="banner-section">
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            Welcome back to Dhananjaya ✨
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
