// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
        { text: 'Help/Support', icon: <HelpOutlineIcon />, path: '/help' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
        { text: 'Feedback', icon: <FeedbackIcon />, path: '/feedback' },
    ];

    return (
        <Box
            sx={{
                width: collapsed ? 72 : 240,
                height: '100vh',
                backgroundColor: '#1e3a8a',
                color: '#fff',
                paddingTop: 2,
                position: 'sticky',
                transition: 'width 0.2s',
            }}
        >
            <IconButton
                onClick={() => setCollapsed(!collapsed)}
                sx={{ color: '#fff', mb: 2, ml: collapsed ? 0 : 1 }}
            >
                {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
            </IconButton>
            <List>
                {navItems.map((item) => (
                    <ListItem button key={item.text} component={Link} to={item.path} sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
                        <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: 'center' }}>
                            {item.icon}
                        </ListItemIcon>
                        {!collapsed && <ListItemText primary={item.text} sx={{ color: '#fff' }} />}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
