import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteItemData, Item } from '../../types';
import axiosApi from '../../axiosApi';

export const getItems = createAsyncThunk<Item[], void>(
  'item/getItems',
  async (_) => {
    const response = await axiosApi.get('/item');

    return response.data;
  }
);

export const getItemsByCategory = createAsyncThunk<Item[], string>(
  'item/getByCategory',
  async (categoryId) => {
    const response = await axiosApi.get(`/item/${categoryId}`);

    return response.data;
  }
);

export const getItemById = createAsyncThunk<Item, string>(
  'item/getById',
  async (itemId) => {
    const response = await axiosApi.get(`/item/details/${itemId}`);

    return response.data;
  }
);

export const deleteOwnItemByUser = createAsyncThunk<void, deleteItemData>(
  'item/deleteItem',
  async (data) => {
    await axiosApi.delete(`/item/${data.id}`, {
      headers: {
        Authorization: data.token
      }
    });
  }
);
