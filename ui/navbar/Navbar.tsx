import React from 'react';
import styles from './navbar.module.css';


const Navbar:React.FC = () => {
  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.container}>
        <h2>Bookstore by Erdem Oz</h2>
      </div>
    </nav>
  )
}

export default Navbar