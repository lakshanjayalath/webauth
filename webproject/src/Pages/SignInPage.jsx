import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  InputAdornment,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import '../css/AuthPages.css'; // Your custom styles
import { login } from '../services/api'; // Axios login method

const SignInPage = () => {
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) return;

    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token); // Store JWT
      navigate('/dashboard'); // Redirect
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        setApiError(error.response.data);
      } else if (error.message) {
        setApiError(error.message);
      } else {
        setApiError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <Box className="main-container">
      <Box className="card">
        {/* Left section: Form */}
        <Box className="form-section">
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Sign in
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            Please login to continue to your account.
          </Typography>

          {apiError && (
            <Typography color="error" mb={2}>
              {apiError}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              className="text-field"
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />

            <TextField
              className="text-field"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  sx={{ color: '#6b7280' }}
                />
              }
              label="Keep me logged in"
              sx={{ mb: 2 }}
            />

            <Button
              className="submit-button"
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mb: 2 }}
            >
              Sign In
            </Button>

            <Divider sx={{ my: 3 }}>or</Divider>

            <Button
              className="alt-button"
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{ mb: 2 }}
            >
              Sign in with Google
            </Button>

            <Button
              className="alt-button"
              fullWidth
              variant="outlined"
              startIcon={<Facebook />}
              sx={{ mb: 2 }}
            >
              Sign in with Facebook
            </Button>

            <Typography variant="body2" align="center" color="textSecondary">
              Need an account?{' '}
              <Link component={RouterLink} to="/signup" underline="hover" color="primary">
                Create one
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Right section: Banner */}
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
