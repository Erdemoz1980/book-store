'use client';
import { useDispatch } from 'react-redux';
import { deleteBook } from '@/app/redux/slices/bookSlice';
import styles from './bookcard.module.css';
import { FaTrash } from 'react-icons/fa';

const BookCard = ({ id, name, price, category }) => {
  const dispatch = useDispatch();
  
  const handleDelete = () => {
   dispatch(deleteBook(id))
 }


  return (
    <section className={styles.cardWrapper}>
      <header className={styles.cardHeader}>
        <h2>{name}</h2>
        </header>
      <section className={styles.cardBody}>
        <ul>
          <li>Category: <span className={styles.highlight}>{category}</span></li>
        <li>Price: <span className={styles.highlight}>$ {price}</span></li>
        </ul>
      </section>       
        <button className={styles.deleteButton} onClick={handleDelete}><FaTrash /></button>
    </section>
  )
}

export default BookCard