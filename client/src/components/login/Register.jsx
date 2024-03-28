import { Link } from 'react-router-dom';
import styles from './LoginRegister.module.scss';
import { useState } from 'react';
import axios from 'axios';
const Register = ({ loginToggleHandler }) => {
    const [userRegisterDetails, setUserRegisterDetails] = useState({});
    async function registerUser() {
        try{
            const options = {
                method: 'POST',
                bodyData: userRegisterDetails
            }
            const response = await axios.post(`http://localhost:5001/users/register`, options);
            if(response.data.message === "EXISTS"){
                console.log("User is already Exists., So Plase Login");
            }
        }
        catch {
            console.log('Error');
        }
    }
    function handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const password = formData.get('password');
        if(!name || !email || !phone || !password) {
            console.log("All fields are Mandatory");
            return;
        }
        setUserRegisterDetails({name, email, phone, password});
        registerUser();
    }

    return <div className={styles.registerContainer}>
        <div>
            <h2>Register Yourself</h2>
            <form className={styles.registerationForm} onSubmit={handleRegister}>
                <input name='name' type="text" placeholder='e.g. Mark Peter' />
                <input name='email' type="email" placeholder='e.g. example@gmail.com' />
                <input name='phone' type="tel" placeholder='e.g. 81xxxxxxxx' />
                <input name='password' type="password" placeholder='Password' />
                <button type="submit" onSubmit={handleRegister}>Register</button>
            </form>
            <div className={styles.redirect}>
                <p>Already registered</p>
                <Link to='/login' onClick={() => loginToggleHandler(true)} >Login here</Link>
            </div>
        </div>
    </div>
}

export default Register;