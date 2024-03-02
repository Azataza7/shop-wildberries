import React from 'react';
import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/Users/usersSlice';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';


const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Grid component="div"
            sx={{
              padding: 1,
              paddingTop: 4,
              backgroundImage: 'url(https://static-basket-01.wbbasket.ru/vol0/marketing/shapkafon/shapka-fon_present_2024.jpg)',
              backgroundSize: 'cover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
      >
        <Grid component={NavLink} to="/">
          <img src="https://static-basket-01.wbbasket.ru/vol0/i/v3/header/logo.svg" alt="logo"/>
        </Grid>
        {user ? <UserMenu/> : <AnonymousMenu/>}
      </Grid>
    </>
  );
};

export default AppToolbar;