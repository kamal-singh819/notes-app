import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';
import { useRef } from "react";
import LogoutUserComponent from "../logoutUser/LogoutUserComponent";
import axios from "axios";


const Navbar = ({ openModal, setCategoryNotes, setAnyChange, userName }) => {
    const token = localStorage.getItem("accessToken");
    const searchRef = useRef();
    const isLoggedIn = !!(localStorage.getItem("accessToken"));

    async function searchItems(searchValue) {
        const response = await axios({
            method: 'get',
            url: `http://localhost:5001/notes/get-notes/?search=${searchValue}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setCategoryNotes(response.data.data);
    }
    function handleSearch() {
        searchItems(searchRef.current.value.trim());
    }

    return <nav className={styles.navbar}>
        <form action="">
            <input ref={searchRef} onChange={handleSearch} type="search" placeholder="Search Your Notes" />
            <FaSearch className={styles.searchIcon} />
        </form>
        {isLoggedIn ? <LogoutUserComponent setAnyChange={setAnyChange} userName={userName} /> : <Link to="/login" className={styles.loginButton} onClick={() => openModal(true)}>Login</Link>}
    </nav>
}

export default Navbar;