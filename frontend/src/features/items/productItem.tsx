import React from 'react';
import { Item } from '../../types';
import { Grid, Typography } from '@mui/material';
import { apiURL } from '../../constants';

interface Props {
  item: Item;
}

const ProductItem: React.FC<Props> = ({item}) => {

  return (
    <>
      <Grid component="div" sx={{ padding: 2, transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.02)'
        }}}>
        <Grid item
              sx={{width: '210px', height: '240px', borderRadius: '10px', backgroundImage: `url(${apiURL + '/' + item.image} )`,
                backgroundRepeat: 'no-repeat', backgroundSize: "220px 240px", backgroundPosition: "center"}}>
        </Grid>
        <Grid item>
          <Typography variant="p" sx={{ fontWeight: 600}}>{item.price} som</Typography>
          <Typography variant="p" sx={{display: "block"}}>{item.title}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductItem;