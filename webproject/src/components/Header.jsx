import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5080/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRole(res.data.role);
          setIsSignedIn(true);
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
          setRole(null);
          setIsSignedIn(false);
        });
    } else {
      setRole(null);
      setIsSignedIn(false);
    }
  }, []);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const getPages = () => {
    if (role === 'Admin') return ['Dashboard', 'Users', 'Settings'];
    if (role === 'User') return ['Home', 'Profile', 'Support'];
    return ['Home'];
  };

  const userSettings = isSignedIn ? ['My Profile', 'Logout'] : ['Sign In', 'Sign Up'];

  const handleUserMenuClick = (setting) => {
    handleCloseUserMenu();
    if (setting === 'Sign In') navigate('/signin');
    else if (setting === 'Sign Up') navigate('/signup');
    else if (setting === 'Logout') {
      localStorage.removeItem('token');
      setRole(null);
      setIsSignedIn(false);
      navigate('/signin');
    } else if (setting === 'My Profile') {
      navigate('/profile');
    }
  };

  return (
    <AppBar style={{ background: 'linear-gradient(to right, #F72585, #3A0CA3)' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Dhananjaya
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {getPages().map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DASHBOARD
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {getPages().map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Profile Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                <AccountCircle fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {userSettings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleUserMenuClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
