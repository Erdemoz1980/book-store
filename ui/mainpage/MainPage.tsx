'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { setIsAddBookModalOpen } from '@/app/redux/slices/bookSlice';
import { BookState} from '@/app/redux/types/book';
import styles from './mainpage.module.css';
import BookCard from '@/ui/bookcard/BookCard';
import AddBookForm from '@/ui/addbookform/AddBookForm';
import UpdateBookForm from '@/ui/updatebookform/UpdateBookForm';
import Spinner from '@/ui/spinner/Spinner';
import { FaPlusCircle } from 'react-icons/fa';

const MainPage: React.FC = () => {
  const { loading, booklist, isAddBookModalOpen, isUpdateBookModalOpen }: BookState = useSelector((state: { books: BookState }) => state.books);

  const dispatch = useDispatch();
  
  return (
    <section className={styles.mainPageWrapper}>
      <button className={styles.addBookButton} onClick={()=>dispatch(setIsAddBookModalOpen(true))}>
        <FaPlusCircle />Add a book
      </button>
      {isAddBookModalOpen && <AddBookForm />}
      {isUpdateBookModalOpen && <UpdateBookForm />}
      {loading && <Spinner loading={loading} />}
      {!loading && booklist.length < 1 ? (
        <p>There are currently no books to show</p>) : (
        <div className={styles.bookDisplayContainer}>
          {booklist.map(book => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MainPage