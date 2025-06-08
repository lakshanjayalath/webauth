import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Checkbox, FormControlLabel,
  Divider, IconButton, InputAdornment, Link
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import '../css/AuthPages.css';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API call or add your sign-up logic here
      navigate('/dashboard');
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
              label="Full Name"
              fullWidth
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{ mb: 2 }}
              error={!!errors.fullName}
              helperText={errors.fullName}
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

            <Button className="submit-button" fullWidth type="submit" variant="contained" sx={{ mb: 2 }}>Sign Up</Button>

            <Divider sx={{ my: 3 }}>or</Divider>

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
