import styles from './navbar.module.css';


const Navbar = () => {
  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.container}>
        <h2>Bookstore by Erdem Oz</h2>
      </div>
    </nav>
  )
}

export default Navbar