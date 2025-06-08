import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomeMenu = () => {
  return (
    <AppBar position="static" style={{ background: 'linear-gradient(to right, #F72585, #3A0CA3)', }}>
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          Dhananjaya
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/signin">
          Sign In
        </Button>
        <Button color="inherit" component={RouterLink} to="/signup">
          Sign Up
        </Button>
        {/* <Button color="inherit" component={RouterLink} to="/dashboard">
          Dashboard
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default HomeMenu;
