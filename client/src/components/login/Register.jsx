import { Link } from 'react-router-dom';
import styles from './LoginRegister.module.scss';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = ({ loginToggleHandler }) => {
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    async function registerUser(name, email, phone, password) {
        console.log(name, email, phone, password );
        try {
            const response = await axios({
                method: 'post',
                url: `http://localhost:5001/users/register`,
                data: { name, email, phone, password }
            });

            if (response.data.message === "EXISTS") {
                console.log("User is already Exists., So Plase Login");
            }
        }
        catch {
            console.log('Error');
        }
    }
    function handleRegister(e) {
        e.preventDefault();
        registerUser(nameRef.current.value.trim(), emailRef.current.value.trim(), phoneRef.current.value.trim(), passwordRef.current.value.trim());
        loginToggleHandler(true);
        navigate('/login');
    }

    return <div className={styles.registerContainer}>
        <div>
            <h2>Register Yourself</h2>
            <form className={styles.registerationForm} onSubmit={handleRegister}>
                <input ref={nameRef} type="text" placeholder='e.g. Mark Peter' />
                <input ref={emailRef} type="email" placeholder='e.g. example@gmail.com' />
                <input ref={phoneRef} type="tel" placeholder='e.g. 81xxxxxxxx' />
                <input ref={passwordRef} type="password" placeholder='Password' />
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