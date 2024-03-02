import React, { JSX, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoadingProductItems, selectProductItems } from './productItemSlice';
import { CircularProgress, Grid } from '@mui/material';
import { getItems } from './productItemThunks';
import { Item } from '../../types';
import ProductItem from './productItem';

const ProductItemList = () => {
  const dispatch = useAppDispatch();

  const productItems: Item[] = useAppSelector(selectProductItems);
  const onLoading = useAppSelector(selectLoadingProductItems);

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  if (onLoading || !productItems) {
    return <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}} size={60} color="warning"/>;
  }

  const productItemsContainer:JSX.Element[] = productItems.map((item) => (
    <ProductItem key={item._id} item={item}/>
  ))

  console.log(productItems)
  return (
    <>
      <Grid component="div" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: '15px'}}>
        {productItemsContainer}
      </Grid>
    </>
  );
};

export default ProductItemList;