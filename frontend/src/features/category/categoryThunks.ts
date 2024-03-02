import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Category } from '../../types';

export const getCategories = createAsyncThunk<Category[], void>(
  'category/getCategories',
  async () => {
    const response = await axiosApi.get<Category[] | null>('category');

    return response.data;
  }
);
