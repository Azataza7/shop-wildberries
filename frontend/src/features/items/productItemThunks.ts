import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '../../types';
import axiosApi from '../../axiosApi';

export const getItems = createAsyncThunk<Item[], void>(
  'item/getItems',
  async (_) => {
    const response = await axiosApi.get('/item');

    return response.data;
  }
);