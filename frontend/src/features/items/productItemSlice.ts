import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../types';
import { getItems } from './productItemThunks';
import { RootState } from '../../app/store';

interface productItemState {
  items: Item[] | null,

  itemsOnLoading: boolean,
}

const initialState: productItemState = {
  items: null,

  itemsOnLoading: false,
};

const productItemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setState: (state: productItemState, {payload: items}) => {
      state.items = items;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state: productItemState) => {
      state.itemsOnLoading = true;
    });
    builder.addCase(getItems.fulfilled, (state: productItemState, {payload: items}) => {
      state.itemsOnLoading = false;
      state.items = items;
    });
    builder.addCase(getItems.rejected, (state: productItemState) => {
      state.itemsOnLoading = false;
    });
  }
});

export const productItemReducer = productItemSlice.reducer;

export const selectProductItems = (state: RootState) => state.items.items;

export const selectLoadingProductItems = (state: RootState) => state.items.itemsOnLoading;