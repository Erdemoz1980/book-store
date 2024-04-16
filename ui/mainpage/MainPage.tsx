'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAddBookModalOpen } from '@/app/redux/slices/bookSlice';
import { BookState} from '@/app/redux/types/book';
import styles from './mainpage.module.css';
import BookCard from '@/ui/bookcard/BookCard';
import AddBookForm from '@/ui/addbookform/AddBookForm';
import UpdateBookForm from '@/ui/updatebookform/UpdateBookForm';
import { FaPlusCircle } from 'react-icons/fa';

const MainPage: React.FC = () => {
  const { booklist, isAddBookModalOpen, isUpdateBookModalOpen }: BookState = useSelector((state: { books: BookState }) => state.books);

  const dispatch = useDispatch();
  
  return (
    <section className={styles.mainPageWrapper}>
      <button className={styles.addBookButton} onClick={()=>dispatch(setIsAddBookModalOpen(true))}>
        <FaPlusCircle />Add a book
      </button>
      {isAddBookModalOpen && <AddBookForm />}
      {isUpdateBookModalOpen && <UpdateBookForm/>}
      {booklist.length < 1 ? (
        <p>There are currently no books to show</p>) : (
        <div className={styles.bookDisplayGrid}>
          {booklist.map(book => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MainPage