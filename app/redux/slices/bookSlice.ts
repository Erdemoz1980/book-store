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
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload
      }
    },
    setIsAddBookModalOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAddBookModalOpen: action.payload
      }
    },
    setIsUpdateBookModalOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isUpdateBookModalOpen: action.payload
      }
    },
    setCurrentBook: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentBook: state.booklist.find(book => book.id === action.payload) || null
      }
    },
    setBookList: (state, action: PayloadAction<Book[]>) => {
      return {
        ...state,
        booklist: action.payload
      }
    },
    addBook: (state, action: PayloadAction<Book>) => {
      return {
        ...state,
        booklist: [...state.booklist, { ...action.payload }]
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        booklist: [...state.booklist].filter(book => book.id !== action.payload)
      }
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const updatedBooklist = state.booklist.map(book => {
        if (book.id === action.payload.id) {
          return {
            ...action.payload
          }
        } else {
          return {
            ...book
          }
        }
      });
      return {
        ...state,
        booklist: updatedBooklist
      }
       
    }
  }
}
);

export const { setLoading, setBookList, deleteBook, addBook, updateBook, setCurrentBook, setIsAddBookModalOpen, setIsUpdateBookModalOpen } = bookSlice.actions;
export default bookSlice.reducer;