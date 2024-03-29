import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../types';
import { deleteOwnItemByUser, getItemById, getItems, getItemsByCategory} from './productItemThunks';
import { RootState } from '../../app/store';

interface productItemState {
  items: Item[] | null,
  itemDetails: Item | null,

  itemsOnLoading: boolean,
  itemDetailsOnLoading: boolean,
  itemDeleteOnLoading: boolean,
}

const initialState: productItemState = {
  items: null,
  itemDetails: null,

  itemsOnLoading: false,
  itemDetailsOnLoading: false,
  itemDeleteOnLoading: false,
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

    builder.addCase(getItemsByCategory.pending, (state: productItemState) => {
      state.itemsOnLoading = true;
    });
    builder.addCase(getItemsByCategory.fulfilled, (state: productItemState, {payload: items}) => {
      state.itemsOnLoading = false;
      state.items = items;
    });
    builder.addCase(getItemsByCategory.rejected, (state: productItemState) => {
      state.itemsOnLoading = false;
    });

    builder.addCase(getItemById.pending, (state: productItemState) => {
      state.itemDetailsOnLoading = true;
    });
    builder.addCase(getItemById.fulfilled, (state: productItemState, {payload: itemDetails}) => {
      state.itemDetailsOnLoading = false;
      state.itemDetails = itemDetails;
    });
    builder.addCase(getItemById.rejected, (state: productItemState) => {
      state.itemDetailsOnLoading = false;
    });

    builder.addCase(deleteOwnItemByUser.pending, (state: productItemState) => {
      state.itemDeleteOnLoading = true;
    });
    builder.addCase(deleteOwnItemByUser.fulfilled, (state: productItemState) => {
      state.itemDeleteOnLoading = false;
    });
    builder.addCase(deleteOwnItemByUser.rejected, (state: productItemState) => {
      state.itemDeleteOnLoading = false;
    });
  }
});

export const productItemReducer = productItemSlice.reducer;

export const selectProductItems = (state: RootState) => state.items.items;
export const selectItemDetails = (state: RootState) => state.items.itemDetails;

export const selectLoadingProductItems = (state: RootState) => state.items.itemsOnLoading;
export const selectLoadingItemDetail = (state: RootState) => state.items.itemDetailsOnLoading;
export const selectLoadingDeleteItem = (state: RootState) => state.items.itemDeleteOnLoading;