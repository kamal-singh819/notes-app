import Navbar from './components/navbar/Navbar';
import LoginRegister from './components/login/LoginRegsiter';
import AddNewTask from './components/addTask/AddNewTask';
import HomePage from './pages/home/HomePage';
import AfterLogoutPage from './pages/afterLogoutPage/AfterLogoutPage';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
    const [anyChange, setAnyChange] = useState(false);
    const [categoryNotes, setCategoryNotes] = useState([]);
    const [modelIsOpen, setModelIsOpen] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const username = JSON.parse(localStorage.getItem("nameAndToken"))?.name;
    function openModal(open) {
        setModelIsOpen(open);
    }
    function openAddTaskModal() {
        setAddTaskModal(true);
    }
    return (
        <>
            <Navbar openModal={openModal} setCategoryNotes={setCategoryNotes} setAnyChange={setAnyChange} />
            <LoginRegister modelIsOpen={modelIsOpen} setModelIsOpen={setModelIsOpen} setAnyChange={setAnyChange} />
            <AddNewTask addTaskModal={addTaskModal} setAddTaskModal={setAddTaskModal} setAnyChange={setAnyChange}/>
            {/* <HomePage openAddTaskModal={openAddTaskModal} categoryNotes={categoryNotes} setCategoryNotes={setCategoryNotes} anyChange={anyChange} setAnyChange={setAnyChange} /> */}
            <Routes>
                <Route path='/' element={username ? <HomePage openAddTaskModal={openAddTaskModal} categoryNotes={categoryNotes} setCategoryNotes={setCategoryNotes} anyChange={anyChange} setAnyChange={setAnyChange} /> : <AfterLogoutPage setModelIsOpen={setModelIsOpen}/>}></Route>
            </Routes>
        </>
    )
}

export default App
