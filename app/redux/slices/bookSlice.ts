"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookState } from '../types/book';


const initialState: BookState = {
  booklist:[],
  currentBook: null,
  isAddBookModalOpen: false,
  isUpdateBookModalOpen: false,
  loading:true
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setLoading: (state, action:PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setIsAddBookModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddBookModalOpen = action.payload
    },
    setIsUpdateBookModalOpen: (state, action:PayloadAction<boolean>) => {
      state.isUpdateBookModalOpen = action.payload
    },
    setCurrentBook: (state, action: PayloadAction<string>) => {
      state.currentBook = state.booklist.find(book => book.id === action.payload) || null
    },
    setBookList: (state, action: PayloadAction<Book[]>) => {
      return {
        ...state,
        booklist: action.payload
      }
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.booklist = [...state.booklist, {...action.payload}]
      localStorage.setItem('booklist', JSON.stringify(state.booklist))
    },
    deleteBook: (state, action:PayloadAction<string>) => {
      const filteredBooks = [...state.booklist].filter(book => book.id !== action.payload)
      state.booklist = filteredBooks;
    },
    updateBook: (state, action: PayloadAction<{ id: string; name?: string; category?: string; price?: string; description?: string }>) => {
        const { id, ...updatedFields } = action.payload;
        const currentBookIndex = state.booklist.findIndex(book => book.id === id);
        const currentBook = state.booklist[currentBookIndex];
        if (currentBook) {
          state.booklist[currentBookIndex] = { ...currentBook, ...updatedFields };
        }
      }
    }
}
);

export const { setLoading, setBookList, deleteBook, addBook, updateBook, setCurrentBook, setIsAddBookModalOpen, setIsUpdateBookModalOpen } = bookSlice.actions;
export default bookSlice.reducer;