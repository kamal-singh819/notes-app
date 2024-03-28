import Navbar from './components/navbar/Navbar';
import LoginRegister from './components/login/LoginRegsiter';
import HomePage from './pages/home/HomePage';
import './App.css'
import { useState } from 'react';

function App() {
    const [modelIsOpen, setModelIsOpen] = useState(false);
    function openModal(open) {
        setModelIsOpen(open);
    }
    return (
        <>
            <Navbar openModal={openModal} />
            <LoginRegister modelIsOpen={modelIsOpen} setModelIsOpen={setModelIsOpen} />
            <HomePage />
        </>
    )
}

export default App
