import { Link } from 'react-router-dom';
import styles from './LoginRegister.module.scss';
import { useState } from 'react';
const Login = ({ loginToggleHandler }) => {
    const [userLoginDetails, setUserLoginDetails] = useState({});
    async function loginUser() {
        try{
            const options = {
                method: 'POST',
                bodyData: userLoginDetails
            }
            console.log(userLoginDetails);
            const response = await axios.post(`http://localhost:5001/users/login`, options);
            console.log(response);
            if(response.data.message === "MISSING"){
                console.log("All fields are mandatory");
            }
            else if(response.data.message === "NOT REGISTERED") {
                console.log("Your are not registered. Please Register first");
            }
            else if(response.data.message === "WRONG") {
                console.log("Email or Password is Wrong");
            }
            else if(response.data.accessToken) {
                console.log(response.data.accessToken);
            }
        }
        catch {
            console.log('Error');
        }
    }
    function handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        if(!email || !password) {
            console.log("All fields are Mandatory");
            return;
        }
        setUserLoginDetails({email, password});
        loginUser();
    }

    return <div className={styles.loginContainer}>
        <div>
            <h2>Sign in Yourself</h2>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <input name='email' type="email" placeholder='e.g. example@gmail.com' />
                <input name='password' type="password" placeholder='Password' />
                <button type="submit" onSubmit={handleLogin}>Login</button>
            </form>
            <div className={styles.redirect}>
                <p>Don't have account</p>
                <Link to='/register' onClick={() => loginToggleHandler(false)}>Register here</Link>
            </div>
        </div>
    </div>
}

export default Login;