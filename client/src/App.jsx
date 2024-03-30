import Navbar from './components/navbar/Navbar';
import LoginModal from './components/login/LoginModal';
import RegisterModal from './components/login/RegisterModal';
import AddNewTask from './components/addTask/AddNewTask';
import HomePage from './pages/home/HomePage';
import AfterLogoutPage from './pages/afterLogoutPage/AfterLogoutPage';
import { useState } from 'react';

function App() {
    const [anyChange, setAnyChange] = useState(false);
    const [categoryNotes, setCategoryNotes] = useState([]);
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const username = JSON.parse(localStorage.getItem("nameAndToken"))?.name;
    function openLoginModal() {
        setLoginModal(true);
    }
    function openAddTaskModal() {
        setAddTaskModal(true);
    }
    return (
        <>
            <Navbar openLoginModal={openLoginModal} setCategoryNotes={setCategoryNotes} setAnyChange={setAnyChange} />
            <LoginModal setLoginModal={setLoginModal} loginModal={loginModal} setRegisterModal={setRegisterModal} setAnyChange={setAnyChange}/>
            <RegisterModal setRegisterModal={setRegisterModal} registerModal={registerModal} setLoginModal={setLoginModal}/>
            <AddNewTask addTaskModal={addTaskModal} setAddTaskModal={setAddTaskModal} setAnyChange={setAnyChange}/>
            {username ? <HomePage openAddTaskModal={openAddTaskModal} categoryNotes={categoryNotes} setCategoryNotes={setCategoryNotes} anyChange={anyChange} setAnyChange={setAnyChange} /> : <AfterLogoutPage/>}
        </>
    )
}

export default App
