"use client";
import { createSlice } from '@reduxjs/toolkit';
import booksData from '@/data.json'

//Check if local storage has booklist
const booklistFromStorage = localStorage.getItem('booklist') ? JSON.parse(localStorage.getItem('booklist')) : null;


const initialState = {
  booklist: booklistFromStorage ? booklistFromStorage : booksData,
  currentBook: {},
  isAddBookModalOpen: false,
  isUpdateBookModalOpen:false
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setIsAddBookModalOpen: (state, action) => {
      state.isAddBookModalOpen = action.payload
    },
    setIsUpdateBookModalOpen: (state, action) => {
      state.isUpdateBookModalOpen = action.payload
    },
    setCurrentBook: (state, action) => {
      const currentBook = state.booklist.find(book => book.id === action.payload);
      state.currentBook = currentBook
    },
    addBook: (state, action) => {
      state.booklist = [...state.booklist, {id:Date.now(), ...action.payload}]
      localStorage.setItem('booklist', JSON.stringify(state.booklist))
    },
    deleteBook: (state, action) => {
      const filteredBooks = state.booklist.filter(book => book.id !== action.payload);
      state.booklist = filteredBooks;
      localStorage.setItem('booklist', JSON.stringify(state.booklist))
    },
    updateBook: (state, action) => {
      const currentBook = state.booklist.find(book => book.id === action.payload.id)
      const newBookData = {
        id:action.payload.id || currentBook.id,
        name: action.payload.name || currentBook.name,
        category: action.payload.category || currentBook.category,
        price: action.payload.price || currentBook.price,
        description: action.payload.description || currentBook.description,
      }
      state.booklist = state.booklist.map(book => {
        if (book.id === currentBook.id) {
          return newBookData
        } else {
          return {...book}
        }
      })
      localStorage.setItem('booklist', JSON.stringify(state.booklist))
    }
  }

});

export const { deleteBook, addBook, updateBook, setCurrentBook, setIsAddBookModalOpen, setIsUpdateBookModalOpen } = bookSlice.actions;
export default bookSlice.reducer;