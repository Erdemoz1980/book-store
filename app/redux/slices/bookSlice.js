"use client";
import { createSlice } from '@reduxjs/toolkit';
import booksData from '@/data.json'

//Check if local storage has booklist
const booklistFromStorage = localStorage.getItem('booklist') ? JSON.parse(localStorage.getItem('booklist')) : null;


const initialState = {
  booklist: booklistFromStorage ? booklistFromStorage : booksData
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    deleteBook: (state, action) => {
      const filteredBooks = state.booklist.filter(book => book.id !== action.payload);
      state.booklist = filteredBooks;
      localStorage.setItem('booklist', JSON.stringify(state.booklist))
    }
  }

});

export const { deleteBook } = bookSlice.actions;
export default bookSlice.reducer;