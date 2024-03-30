import { HiOutlineLogout } from "react-icons/hi";
import styles from './logoutUser.module.scss';
const LogoutUserComponent = ({ setAnyChange}) => {

    function handleLogout() {
        console.log("Logout");
        localStorage.removeItem("nameAndToken");
        setAnyChange(prev => !prev);
    }

    return <div className={styles.logoutContainer}>
        <p>{JSON.parse(localStorage.getItem('nameAndToken'))?.name}</p>
        <HiOutlineLogout className={styles.logoutButton} onClick={handleLogout} />
    </div>
}

export default LogoutUserComponent;