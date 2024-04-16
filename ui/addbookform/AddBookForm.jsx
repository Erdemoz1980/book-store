'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddBookModalOpen} from '@/app/redux/slices/bookSlice';
import { addBook } from '@/app/redux/slices/bookSlice';
import styles from './addbookform.module.css';
import { FaRegTimesCircle } from 'react-icons/fa';


const AddBookForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description:''
  });

  const { isAddBookModalOpen } = useSelector(state => state.books);
  const dispatch = useDispatch();


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
    dispatch(addBook(formData));

    //Reset the form state after submit
    setFormData({ name: '', category: '', price: '', description:'' })
    
    //Close the modal after submit
    dispatch(setIsAddBookModalOpen(false));
  }

  return (
    <section  className={`${isAddBookModalOpen ? styles.formModalOverlay : styles.closed}`}>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <button className={styles.closeButton} onClick={()=>dispatch(setIsAddBookModalOpen(false))}>
         <FaRegTimesCircle className={styles.closeIcon} />
        </button>
        <h2>Add a book</h2>
        
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

export default AddBookForm