import { configureStore } from '@reduxjs/toolkit';
import { productItemReducer } from '../features/items/productItemSlice';
import { categoryReducer } from '../features/category/categorySlice';

export const store = configureStore({
  reducer: {
    items: productItemReducer,
    category: categoryReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;