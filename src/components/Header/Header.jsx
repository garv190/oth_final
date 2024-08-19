import axios from 'axios';

import React, {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
// import Paper from '@mui/material/Paper';
import './Header.css';
// import {jwtDecode} from 'jwt-decode';
// import data from "./data/data.json"
// const pages = ['Leaderboard', 'Guidelines', 'Rules'];
// const settings = ['Sign Up', 'Sign In', 'Questions'];
// import Heading from '../Heading/Heading';

function ResponsiveAppBar({t}) {
  //const user="Garv"
  const [navbarWidth, setNavbarWidth] = React.useState(window.innerWidth);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userName, setUserName] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to fetch user data
        const response = await axios.post('https://online-treasure-hunt-10.onrender.com/userData');
  
       const userName = response.data.username;
        //console.log(response)
        // Set the username received from the backend
        setUserName(userName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  React.useEffect(() => {
    const handleResize = () => {
      setNavbarWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    
    <AppBar position="static" className="root" style={{ backgroundColor:'rgba(255, 255, 255, 0.2)',width: navbarWidth }}>
    
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
         
          <Typography
        
            variant="h6"
            noWrap
            component="a"
            href="#User"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'skyblue',
              textDecoration: 'none',
              
            }}
          >
           {userName || "OTH"}
          </Typography>
         
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              textDecoration="none"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {t.pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={page.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign="center" sx={{ fontFamily: 'Poppins, sans-serif' }}>{page.info}</Typography></Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          {/* <Link to={t.pages.url}> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#User"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              // fontFamily: 'Poppins, sans-serif', // Change font family to Poppins
              
              letterSpacing: '.1rem',
              color: 'skyblue',
              textDecoration: 'none',
            }}
          >
            {userName || "OTH"}
          </Typography>
          {/* </Link> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className='t'>
            {t.pages.map((page) => (
              <Link to={page.url} key={page.info} style={{ textDecoration: 'none' }}>
              <Button
                key={page.info}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'grey', display: 'block',fontFamily: 'Poppins, sans-serif' }}
              >
                {page.info}
              </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Register">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon style={{ fontSize: 60,color:'white' }}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {t.settings.map((setting) => (
                <Link to={setting.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem key={setting.info} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" sx={{ fontFamily: 'Poppins, sans-serif' }}>{setting.info}</Typography>
                </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* <Heading/> */}
    </AppBar>
   
  );
}
export default ResponsiveAppBar;