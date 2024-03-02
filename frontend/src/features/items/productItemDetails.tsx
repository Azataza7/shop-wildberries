import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { selectItemDetails, selectLoadingItemDetail } from './productItemSlice';
import { getItemById } from './productItemThunks';
import { Item } from '../../types';
import { apiURL } from '../../constants';

const ProductItemDetails = () => {
  const dispatch = useAppDispatch();

  const itemId = useParams().id.toString();
  const itemDetail: Item = useAppSelector(selectItemDetails);
  const onLoading = useAppSelector(selectLoadingItemDetail);

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
      <Grid component="div" sx={{ display: "flex", justifyContent: "center", flexDirection: "column"}}>
        <Grid component="div" sx={{ padding: 2, bgcolor: '#EEE'}}>
          <img src={apiURL + '/' + itemDetail.image} alt={itemDetail.title + 'image'}
               style={{maxWidth: 600, maxHeight: 500}}
          />
        </Grid>
        <Grid component="div" sx={{ mt: 2, position: "relative"}}>
          <Typography variant="h4" sx={{textAlign: "center", fontWeight: 600}}>
            {itemDetail.title}
          </Typography>
          <Typography variant="h6" sx={{textAlign: "center"}}>
            {itemDetail.description}
          </Typography>
          <Typography variant="h6">
            Seller: {itemDetail.user.displayName}
          </Typography>
          <Typography variant="h6">
            Price: {itemDetail.price} som
          </Typography>
          <Typography variant="h6" sx={
            {color: 'orange', fontSize: '20px', position: "absolute", top: '20%', right: '5%',
            padding: 1, borderRadius: '20px', border: '2px solid orange'}}>
            #{itemDetail.category.name}
          </Typography>
        </Grid>
      </Grid>

    </>
  );
};

export default ProductItemDetails;