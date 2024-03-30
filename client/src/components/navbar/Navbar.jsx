import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';
import { useRef } from "react";
import LogoutUserComponent from "../logoutUser/LogoutUserComponent";
import axios from "axios";


const Navbar = ({ openLoginModal, setCategoryNotes, setAnyChange }) => {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    const searchRef = useRef();
    const isLoggedIn = !!token;

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
        if(isLoggedIn) searchItems(searchRef.current.value.trim());
    }

    return <nav className={styles.navbar}>
        <form action="">
            <input ref={searchRef} onChange={handleSearch} type="search" placeholder="Search Your Notes" />
            <FaSearch className={styles.searchIcon} />
        </form>
        {isLoggedIn ? <LogoutUserComponent setAnyChange={setAnyChange} /> : <button onClick={openLoginModal} className={styles.loginButton}>Login</button>}
    </nav>
}

export default Navbar;