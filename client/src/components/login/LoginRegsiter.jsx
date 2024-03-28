import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';
import styles from './LoginRegister.module.scss';

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#root');

const LoginRegister = ({ modelIsOpen, setModelIsOpen }) => {
    const [showLogin, setShowLogin] = useState(true);

    function loginToggleHandler(showLogin) {
        setShowLogin(showLogin);
    }

    function closeModal() {
        setModelIsOpen(false);
    }
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    let subtitle;
    return <>
        <div>
            <Modal isOpen={modelIsOpen} onRequestClose={closeModal} style={modalStyle} contentLabel='Example Modal'>
                <button onClick={closeModal} className={styles.modalCloseButton}>X</button>
                <Routes>
                    {showLogin ? <Route path='/login' element={<Login loginToggleHandler={loginToggleHandler} />}></Route> : <Route path='/register' element={<Register loginToggleHandler={loginToggleHandler} />}></Route>}
                </Routes>
            </Modal>
        </div>
    </>
}

export default LoginRegister;