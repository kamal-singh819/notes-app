import { HiOutlineLogout } from "react-icons/hi";
import styles from './logoutUser.module.scss';
const LogoutUserComponent = ({ setAnyChange, userName }) => {

    function handleLogout() {
        console.log("Logout");
        localStorage.removeItem("accessToken");
        setAnyChange(prev => !prev);
    }

    return <div className={styles.logoutContainer}>
        <p>{userName}</p>
        <HiOutlineLogout className={styles.logoutButton} onClick={handleLogout} />
    </div>
}

export default LogoutUserComponent;