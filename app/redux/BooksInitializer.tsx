'use client';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { setBookList, setLoading } from '@/app/redux/slices/bookSlice';
import booksData from '@/data.json';
import { BookState } from './types/book';

interface BookInitializerProps {
  children: ReactNode
}

const BooksInitializer: React.FC<BookInitializerProps> = ({ children }) => {
  const { booklist }:BookState = useSelector((state: { books: BookState }) => state.books);
  const dispatch = useDispatch();

  
  //Using the useLocalStorage hook to sync booklist with local storage
  useLocalStorage('booklist', booklist);
  

  useEffect(() => {
     
    const fetchBookList = () => {
      try {
      const booklistFromStorage = localStorage.getItem('booklist');
      const booklist = booklistFromStorage ? JSON.parse(booklistFromStorage) : booksData;
      
      dispatch(setBookList(booklist));
      
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchBookList();
   
  }, [dispatch]);


  return children
}

export default BooksInitializer