import { Link } from 'react-router-dom';
import styles from './LoginRegister.module.scss';
const Register = ({ loginToggleHandler }) => {
    return <div className={styles.registerContainer}>
        <div>
            <h2>Register Yourself</h2>
            <form action="" className={styles.registerationForm}>
                <input type="text" placeholder='e.g. Mark Peter' />
                <input type="email" placeholder='e.g. example@gmail.com' />
                <input type="tel" placeholder='e.g. 81xxxxxxxx' />
                <input type="password" placeholder='Password' />
                <button type="submit">Register</button>
            </form>
            <div className={styles.redirect}>
                <p>Already registered</p>
                <Link to='/login' onClick={() => loginToggleHandler(true)} >Login here</Link>
            </div>
        </div>
    </div>
}

export default Register;