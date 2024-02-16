'use client';

import { Edit, LocalLibrary, LoginOutlined, Logout, Menu, Mode, ModeEdit } from '@mui/icons-material';
import {
  Avatar,
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [state, setState] = useState(false);

  // @ts-ignore
  const { userData, setUserData } = useContext(AuthContext);

  console.log(userData);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };

  const handleLogout = () => {
    localStorage.setItem('forms', '');
    setUserData('');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem',
        background: '#fff',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1,
      }}
    >
      <Box className='Navbar_logo'>BLOG_</Box>
      <Box
        className={'desktop_view'}
      >
        {userData && (
          <a href='/blogs/writeBlog' className='Nav_login_reg'>
            <Edit /> Write
          </a>
        )}
        {userData && (
          <a href='/blogs/myBlog' className='Nav_login_reg'>
            My blogs
          </a>
        )}
        {!userData && (
          <a href='/auth/login' className='Nav_login_reg'>
            Login/Register
          </a>
        )}
        {userData && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Avatar sx={{ mr: 1 }} />
            <span>{userData?.username}</span>
          </Box>
        )}
        {userData && (
          <p className='nav_logout' onClick={handleLogout}>
            Logout
          </p>
        )}
      </Box>
      <Box className={'mobile_view'}>
        <button onClick={toggleDrawer(true)}>
          <Menu />
        </button>
        <SwipeableDrawer
          anchor={'right'}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box
            sx={{ width: 250 }}
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {!userData && (
                <ListItem disablePadding>
                  <a href='/auth/login'>
                    <ListItemButton>
                      <ListItemIcon>
                        <LoginOutlined />
                      </ListItemIcon>
                      <ListItemText primary={'Login/Register'} />
                    </ListItemButton>
                  </a>
                </ListItem>
              )}
              {userData && (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar />
                    </ListItemIcon>
                    <ListItemText primary={userData?.username} />
                  </ListItemButton>
                </ListItem>
              )}
              {userData && (
                <ListItem disablePadding>
                  <a href='/blogs/writeBlog'>
                    <ListItemButton>
                      <ListItemIcon>
                        <Edit />
                      </ListItemIcon>
                      <ListItemText primary={'Write Blog'} />
                    </ListItemButton>
                  </a>
                </ListItem>
              )}
              {userData && (
                <ListItem disablePadding>
                  <a href='/blogs/myBlog'>
                    <ListItemButton>
                      <ListItemIcon>
                        <LocalLibrary />
                      </ListItemIcon>
                      <ListItemText primary={'My Blogs'} />
                    </ListItemButton>
                  </a>
                </ListItem>
              )}
              {userData && (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} onClick={handleLogout} />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>
        </SwipeableDrawer>
      </Box>
    </Box>
  );
};

export default Navbar;
