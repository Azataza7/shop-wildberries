import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteItemData, Item, userItem, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

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

export const createItem = createAsyncThunk<void, userItem, { rejectValue: ValidationError }>(
  'posts/new',
  async (data, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', data.price);


      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await axiosApi.post('/item', formData, {
        headers: {
          Authorization: data.token
        }
      });
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);