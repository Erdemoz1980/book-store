'use client';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBookList, setLoading } from '@/app/redux/slices/bookSlice';
import booksData from '@/data.json';

interface BookInitializerProps {
  children: ReactNode
}

const BooksInitializer: React.FC<BookInitializerProps> = ({ children }) => {
  const dispatch = useDispatch();

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