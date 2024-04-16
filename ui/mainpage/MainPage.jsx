'use client';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAddBookModalOpen, setIsUpdateBookModalOpen} from '@/app/redux/slices/bookSlice';
import styles from './mainpage.module.css';
import BookCard from '@/ui/bookcard/BookCard';
import AddBookForm from '@/ui/addbookform/AddBookForm';
import UpdateBookForm from '@/ui/updatebookform/UpdateBookForm';
import { FaPlusCircle } from 'react-icons/fa';

const MainPage = () => {
  const { booklist, isAddBookModalOpen, isUpdateBookModalOpen  } = useSelector(state => state.books);


  const dispatch = useDispatch();

  
  return (
    <section className={styles.mainPageWrapper}>
      <button className={styles.addBookButton} onClick={()=>dispatch(setIsAddBookModalOpen(true))}>
        <FaPlusCircle />Add a book
      </button>
      {isAddBookModalOpen && <AddBookForm setIsAddBookModalOpen={setIsAddBookModalOpen} isAddBookModalOpen={isAddBookModalOpen} />}
      {isUpdateBookModalOpen && <UpdateBookForm setIsUpdateBookModalOpen={setIsUpdateBookModalOpen} isUpdateBookModalOpen={isUpdateBookModalOpen} />}
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