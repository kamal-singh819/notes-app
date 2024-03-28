import { Link } from 'react-router-dom';
import styles from './LoginRegister.module.scss';
const Login = ({ loginToggleHandler }) => {
    return <div className={styles.loginContainer}>
        <div>
            <h2>Sign in Yourself</h2>
            <form action="" className={styles.loginForm}>
                <input type="email" placeholder='e.g. example@gmail.com' />
                <input type="password" placeholder='Password' />
                <button type="submit">Login</button>
            </form>
            <div className={styles.redirect}>
                <p>Don't have account</p>
                <Link to='/register' onClick={() => loginToggleHandler(false)}>Register here</Link>
            </div>
        </div>
    </div>
}

export default Login;