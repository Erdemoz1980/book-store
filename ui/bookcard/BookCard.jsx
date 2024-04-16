'use client';
import { useDispatch } from 'react-redux';
import { deleteBook, setCurrentBook, setIsUpdateBookModalOpen } from '@/app/redux/slices/bookSlice';
import styles from './bookcard.module.css';
import { FaTrash } from 'react-icons/fa';

const BookCard = ({ id, name, price, category, description }) => {
  const dispatch = useDispatch();
  
  const handleDelete = () => {
   dispatch(deleteBook(id))
 }

  const onClickHandler = (e) => {
      //Set the current book in Redux state
      dispatch(setCurrentBook(id));
    
      //Open Update Book Form modal
      dispatch(setIsUpdateBookModalOpen(true))
  
  };
  
  return (
    <div className={styles.cardOuterWrapper}>
    <section className={styles.cardWrapper} onClick={onClickHandler}>
      <header className={styles.cardHeader}>
        <h2>{name}</h2>
        </header>
      <section className={styles.cardBody}>
        <ul>
          <li>Category: <span className={styles.highlight}>{category}</span></li>
          <li>Price: <span className={styles.highlight}>$ {price}</span></li>
          <li>Description:
            <p className={styles.description}>{description}</p>
            </li>
        </ul>
      </section>       
      </section>
      <button className={styles.deleteButton} onClick={handleDelete}><FaTrash /></button>
      </div>
  )
}

export default BookCard