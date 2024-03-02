import React from 'react';
import { Button, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Grid sx={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFF'}}
      >
        <AccountCircleIcon/>
        <Button component={NavLink} to="login" color="inherit" sx={{fontWeight: 600}}>Log In</Button>
        <AccountCircleIcon/>
        <Button component={NavLink} to="register" color="inherit" sx={{fontWeight: 600}}>Sign Up</Button>
      </Grid>
    </>
  );
};

export default AnonymousMenu;