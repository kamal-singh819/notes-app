import { Link } from 'react-router-dom';
import styles from './LoginRegister.module.scss';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
const Login = ({ loginToggleHandler, setModelIsOpen, setAnyChange}) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    async function loginUser(email, password) {
        try {
            const response = await axios({
                method: 'post',
                url: `http://localhost:5001/users/login`,
                data: { email, password }
            });

            if (response.data.message === "MISSING") {
                console.log("All fields are mandatory");
                return 0;
            }
            else if (response.data.message === "NOT REGISTERED") {
                console.log("Your are not registered. Please Register first");
                return 0;
            }
            else if (response.data.message === "WRONG") {
                console.log("Email or Password is Wrong");
                return 0;
            }
            else if (response.data.accessToken) {
                console.log("response", response.data);
                localStorage.setItem("nameAndToken", JSON.stringify({token: response.data.accessToken, name: response.data.name}));
                setAnyChange(prev => !prev);
                console.log("Token generated and saved in local Storage");
                return 1;
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }
    function handleLogin(e) {
        e.preventDefault();
        const res = loginUser(emailRef.current.value.trim(), passwordRef.current.value.trim());
        res.then(r => {
            if(r) navigate('/');
        });
        setModelIsOpen(false);
    }

    return <div className={styles.loginContainer}>
        <div>
            <h2>Sign in Yourself</h2>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <input ref={emailRef} type="email" placeholder='e.g. example@gmail.com' />
                <input ref={passwordRef} type="password" placeholder='Password' />
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