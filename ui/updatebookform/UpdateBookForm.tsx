'use client';
import React from 'react';
import { BookState } from '@/app/redux/types/book';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook, setIsUpdateBookModalOpen } from '@/app/redux/slices/bookSlice';
import styles from './updatebookform.module.css';
import { FaRegTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MAX_DESCRIPTION_LENGTH } from '@/ui/constants';


const UpdateBookForm:React.FC = () => {
  const [formData, setFormData] = useState({
    id:'',
    name: '',
    category: '',
    price: '',
    description:''
  });

  const dispatch = useDispatch();
  const { isUpdateBookModalOpen, currentBook, booklist }: BookState = useSelector((state: { books: BookState }) => state.books);

  //Populate the form with current book data
  useEffect(() => {
    // Check if currentBook is not null or undefined
    if (currentBook) {
      setFormData({
        id:currentBook.id ?? '',
        name: currentBook.name ?? '',
        category: currentBook.category ?? '',
        price: currentBook.price ?? '',
        description: currentBook.description ?? '',
      });
    }
  }, [currentBook]);

  const onChangeHandler =<T extends HTMLInputElement | HTMLTextAreaElement> (e:React.ChangeEvent<T>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]:value
    }))
  }

  const submitHandler = (e:React.FormEvent) => {
    e.preventDefault();    

    //Add the book data to redux state
    dispatch(updateBook(formData));

    //Close the modal after submit
    dispatch(setIsUpdateBookModalOpen(false));
    
    toast.success('Book successfully updated!')
  }

  return (
    <section className={`${isUpdateBookModalOpen ? styles.formModalOverlay : styles.closed}`}>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <button className={styles.closeButton} onClick={()=>dispatch(setIsUpdateBookModalOpen(false))}>
         <FaRegTimesCircle className={styles.closeIcon} />
        </button>
        <h2>Update book</h2>
        
        <label htmlFor="name">Enter Name
          <input type="text" name="name" id="name" value={formData.name} onChange={onChangeHandler} required /></label>
       
        <label htmlFor="category">Enter Category
        <input type="text" name="category" id="category" value={formData.category} onChange={onChangeHandler} required /></label>
      
        <label htmlFor="price">Enter Price
        <input type="text" name="price" id="price" value={formData.price} onChange={onChangeHandler} required />
        </label>
        
        <label htmlFor="description">Description
       
        <textarea name="description" id="description" value={formData.description} onChange={onChangeHandler} maxLength={MAX_DESCRIPTION_LENGTH} required></textarea></label>
       
      <button className={styles.submitButton}>
        Submit
      </button>
      </form>
      </section>
  )
}

export default UpdateBookForm