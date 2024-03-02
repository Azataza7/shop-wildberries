import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { selectItemDetails, selectLoadingDeleteItem, selectLoadingItemDetail } from './productItemSlice';
import { deleteOwnItemByUser, getItemById } from './productItemThunks';
import { Item, User } from '../../types';
import { apiURL } from '../../constants';
import { selectUser } from '../Users/usersSlice';

const ProductItemDetails = () => {
  const dispatch = useAppDispatch();

  const itemId = useParams().id.toString();
  const itemDetail: Item = useAppSelector(selectItemDetails);
  const onLoading = useAppSelector(selectLoadingItemDetail);
  const deleteOnLoading = useAppSelector(selectLoadingDeleteItem);
  const user: User = useAppSelector(selectUser);
  const navigate = useNavigate();

  const isSeller = itemDetail && user && itemDetail.user._id === user._id;


  const handleDelete = () => {
    dispatch(deleteOwnItemByUser({id: itemDetail._id, token: user.token}));
    navigate('/');
  };

  console.log(user);

  useEffect(() => {
    if (itemId) {
      dispatch(getItemById(itemId));
    }
  }, [dispatch, itemId]);

  if (onLoading || !itemDetail) {
    return <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}} size={60} color="warning"/>;
  }

  return (
    <>
      <Grid component="div" sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <Grid component="div" sx={{padding: 2, bgcolor: '#EEE'}}>
          <img src={apiURL + '/' + itemDetail.image} alt={itemDetail.title + 'image'}
               style={{maxWidth: 600, maxHeight: 500}}
          />
        </Grid>
        <Grid component="div" sx={{mt: 2, position: 'relative'}}>
          <Typography variant="h4" sx={{textAlign: 'center', fontWeight: 600}}>
            {itemDetail.title}
          </Typography>
          <Typography variant="h6" sx={{textAlign: 'center'}}>
            {itemDetail.description}
          </Typography>
          <Typography variant="h6">
            Seller: {itemDetail.user.username}
          </Typography>
          <Typography variant="h6">
            Price: {itemDetail.price} som
          </Typography>
          <Typography variant="h6" sx={
            {
              color: 'orange', fontSize: '20px', position: 'absolute', top: '20%', right: '5%',
              padding: 1, borderRadius: '20px', border: '2px solid orange'
            }}>
            #{itemDetail.category.name}
          </Typography>
        </Grid>
        {isSeller && (
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Sold
          </Button>
        )}
      </Grid>

    </>
  );
};

export default ProductItemDetails;