'use client';
import { useSelector } from 'react-redux';
import styles from './mainpage.module.css';
import BookCard from '@/ui/bookcard/BookCard';

const MainPage = () => {
  const { booklist } = useSelector(state => state.books);

  

  return booklist.length < 1 ? (
     <p>There are currently no books to show</p> 
  ) : (
      <section className={styles.mainPageWrapper}>
        {booklist.map(book => (
          <BookCard key={book.id} {...book} />
        ))}

    </section> 
   )
    
  
}

export default MainPage