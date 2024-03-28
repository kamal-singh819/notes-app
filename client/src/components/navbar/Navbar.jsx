import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';
const Navbar = ({ openModal }) => {
    return <nav className={styles.navbar}>
        <form action="">
            <input type="text" placeholder="Search Your Notes" />
            <FaSearch className={styles.searchIcon} />
        </form>
        <Link to="/login" className={styles.loginButton} onClick={() => openModal(true)}>Login</Link>
    </nav>
}

export default Navbar;