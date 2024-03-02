import { configureStore } from '@reduxjs/toolkit';
import { productItemReducer } from '../features/items/productItemSlice';

export const store = configureStore({
  reducer: {
    items: productItemReducer,

  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;