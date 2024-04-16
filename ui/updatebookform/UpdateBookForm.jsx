'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook, setCurrentBook, setIsUpdateBookModalOpen } from '@/app/redux/slices/bookSlice';
import styles from './updatebookform.module.css';
import { FaRegTimesCircle } from 'react-icons/fa';


const UpdateBookForm = () => {
  const [formData, setFormData] = useState({
    id:'',
    name: '',
    category: '',
    price: '',
    description:''
  });

  const dispatch = useDispatch();
  const { isUpdateBookModalOpen, currentBook } = useSelector(state => state.books);

  //Populate the form with current book data
  useEffect(() => {
    setFormData({
      id:currentBook.id,
      name: currentBook.name,
      category: currentBook.category,
      price: currentBook.price,
      description: currentBook.description,
    })
  }, [currentBook]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]:value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault();    

    //Add the book data to redux state
    dispatch(updateBook(formData));

    //Close the modal after submit
    dispatch(setIsUpdateBookModalOpen(false));
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
       
        <textarea name="description" id="description" cols="30" rows="10" value={formData.description} onChange={onChangeHandler} required></textarea></label>
       
      <button className={styles.submitButton}>
        Submit
      </button>
      </form>
      </section>
  )
}

export default UpdateBookForm