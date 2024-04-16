"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookState } from '../types/book';
import booksData from '@/data.json'

//Check if local storage has booklist
const booklistFromStorageString = localStorage.getItem('booklist');
const booklistFromStorage = booklistFromStorageString ? JSON.parse(booklistFromStorageString) : [];


const initialState: BookState = {
  booklist: booklistFromStorage ? booklistFromStorage : booksData,
  currentBook: null,
  isAddBookModalOpen: false,
  isUpdateBookModalOpen:false
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setIsAddBookModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddBookModalOpen = action.payload
    },
    setIsUpdateBookModalOpen: (state, action:PayloadAction<boolean>) => {
      state.isUpdateBookModalOpen = action.payload
    },
    setCurrentBook: (state, action: PayloadAction<string>) => {
      state.currentBook = state.booklist.find(book => book.id === action.payload) || null
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.booklist = [...state.booklist, {...action.payload}]
      localStorage.setItem('booklist', JSON.stringify(state.booklist))
    },
    deleteBook: (state, action) => {
      const filteredBooks = state.booklist.filter(book => book.id !== action.payload);
      state.booklist = filteredBooks;
      localStorage.setItem('booklist', JSON.stringify(state.booklist))
    },
    updateBook: (state, action: PayloadAction<{ id: string; name?: string; category?: string; price?: string; description?: string }>) => {
        const { id, ...updatedFields } = action.payload;
        const currentBookIndex = state.booklist.findIndex(book => book.id === id);
        const currentBook = state.booklist[currentBookIndex];
        if (currentBook) {
          state.booklist[currentBookIndex] = { ...currentBook, ...updatedFields };
          localStorage.setItem('booklist', JSON.stringify(state.booklist));
        }
      }
    }
}
);

export const { deleteBook, addBook, updateBook, setCurrentBook, setIsAddBookModalOpen, setIsUpdateBookModalOpen } = bookSlice.actions;
export default bookSlice.reducer;