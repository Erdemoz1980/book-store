'use client';
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice';

const store = configureStore({
  reducer: {
    books: bookReducer
  },
  devTools: true
});

export default store;