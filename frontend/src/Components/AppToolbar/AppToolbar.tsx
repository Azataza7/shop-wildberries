import React from 'react';
import { Button, Grid} from '@mui/material';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const AppToolbar = () => {
  return (
    <>
      <Grid component="div"
            sx={{ padding: 1,paddingTop: 4, backgroundImage: 'url(https://static-basket-01.wbbasket.ru/vol0/marketing/shapkafon/shapka-fon_present_2024.jpg)',
            backgroundSize: "cover",display: "flex", alignItems: "center", justifyContent: "space-between"}}
      >
        <Grid component={NavLink} to="/">
          <img src="https://static-basket-01.wbbasket.ru/vol0/i/v3/header/logo.svg" alt="logo"/>
        </Grid>
        <Grid sx={{display: "flex", alignItems: "center", textDecoration: 'none', color: '#FFF'}}
        >
          <AccountCircleIcon/>
          <Button component={NavLink} to="login" color="inherit" sx={{fontWeight: 600}}>Log In</Button>
          <AccountCircleIcon/>
          <Button component={NavLink} to="register" color="inherit" sx={{fontWeight: 600}}>Sign Up</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AppToolbar;