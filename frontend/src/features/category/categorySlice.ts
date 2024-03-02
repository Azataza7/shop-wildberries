import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../types';
import { RootState } from '../../app/store';
import { getCategories } from './categoryThunks';

interface categoryState {
  categories: Category[] | null,

  categoriesOnLoading: boolean,
}

const initialState: categoryState = {
  categories: null,

  categoriesOnLoading: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setState: (state: categoryState, {payload: categories}) => {
      state.categories = categories;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state: categoryState) => {
      state.categoriesOnLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state: categoryState, {payload: categories}) => {
      state.categoriesOnLoading = false;
      state.categories = categories;
    });
    builder.addCase(getCategories.rejected, (state: categoryState) => {
      state.categoriesOnLoading = false;
    });
  }
});

export const categoryReducer = categorySlice.reducer;

export const selectCategories = (state: RootState) => state.category.categories;

export const selectLoadingCategories = (state: RootState) => state.category.categoriesOnLoading;