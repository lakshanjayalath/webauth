import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Checkbox, FormControlLabel,
  Divider, IconButton, InputAdornment, Link
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import axios from 'axios';
import '../css/AuthPages.css';

const SignUpPage = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!role.trim()) newErrors.role = 'Role is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (validate()) {
      try {
        // Register user with role
        await axios.post('http://localhost:5080/api/auth/register', {
          email,
          password,
          role
        });

        // Auto-login after registration
        try {
          const loginRes = await axios.post('http://localhost:5080/api/auth/login', {
            email,
            password
          });
          localStorage.setItem('token', loginRes.data.token);
          navigate('/dashboard');
        } catch (loginError) {
          console.error('Auto-login failed:', loginError.response?.data || loginError.message);
          setApiError('Registered, but login failed. Please try logging in manually.');
        }
      } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        if (error.response && error.response.data) {
          setApiError(error.response.data);
        } else {
          setApiError('Registration failed. Please try again.');
        }
      }
    }
  };


  return (
    <Box className="main-container">
      <Box className="card">
        <Box className="form-section">

          <Typography variant="h4" gutterBottom fontWeight="bold" color='primary'>Sign up</Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            Please create an account to get started.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              className="text-field"
              label="Role"
              fullWidth
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{ mb: 2 }}
              error={!!errors.role}
              helperText={errors.role}
            />
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
            <TextField
              className="text-field"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <FormControlLabel
              control={
                <Checkbox checked={keepLoggedIn} onChange={(e) => setKeepLoggedIn(e.target.checked)} sx={{ color: '#6b7280' }} />
              }
              label="Keep me logged in"
              sx={{ mb: 2, color: '#6b7280' }}
            />

            {apiError && <Typography color="error" sx={{ mb: 1 }}>{apiError}</Typography>}

            <Button className="submit-button" fullWidth type="submit" variant="contained" sx={{ mb: 2 }}>Sign Up</Button>

            <Divider sx={{ my: 3, color: '#6b7280' }}>or</Divider>

            <Button className="alt-button" fullWidth variant="outlined" startIcon={<Google />}>Sign up with Google</Button>
            <Button className="alt-button" fullWidth variant="outlined" startIcon={<Facebook />} sx={{ mt: 2 }}>Sign up with Facebook</Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }} color='textSecondary'>
              Already have an account?{' '}
              <Link component={RouterLink} to="/signin" underline="hover" color="primary">
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box className="banner-section">
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            Sign Up ✨
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
