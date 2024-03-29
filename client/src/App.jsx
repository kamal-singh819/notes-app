import Navbar from './components/navbar/Navbar';
import LoginRegister from './components/login/LoginRegsiter';
import AddNewTask from './components/addTask/AddNewTask';
import HomePage from './pages/home/HomePage';
import { useState } from 'react';

function App() {
    const [anyChange, setAnyChange] = useState(false);
    const [categoryNotes, setCategoryNotes] = useState([]);
    const [modelIsOpen, setModelIsOpen] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [userName, setUserName] = useState('username');
    function openModal(open) {
        setModelIsOpen(open);
    }
    function openAddTaskModal() {
        setAddTaskModal(true);
    }
    return (
        <>
            <Navbar openModal={openModal} setCategoryNotes={setCategoryNotes} setAnyChange={setAnyChange} userName={userName} />
            <LoginRegister modelIsOpen={modelIsOpen} setModelIsOpen={setModelIsOpen} setAnyChange={setAnyChange} setUserName={setUserName} />
            <AddNewTask addTaskModal={addTaskModal} setAddTaskModal={setAddTaskModal} setAnyChange={setAnyChange} />
            <HomePage openAddTaskModal={openAddTaskModal} categoryNotes={categoryNotes} setCategoryNotes={setCategoryNotes} anyChange={anyChange} setAnyChange={setAnyChange} />
        </>
    )
}

export default App
