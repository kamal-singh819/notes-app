import styles from './Home.module.scss';
import TaskCard from '../../components/taskCard/TaskCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ openAddTaskModal, categoryNotes, setCategoryNotes, anyChange, setAnyChange }) => {
    const [category, setCategory] = useState('get-notes'); //by default get all the notes
    const [categoryStyle, setCategoryStyle] = useState('All'); //by default all selected
    const [multiDeleteNotes, setMultiDeleteNotes] = useState([]);
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    const isLoggedIn = !!token;

    useEffect(() => {
        if (isLoggedIn) {
            async function fetchData() {
                const response = await axios({
                    method: 'get',
                    url: `http://localhost:5001/notes/${category}`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCategoryNotes(response.data.data);
            }
            fetchData();
        }
    }, [category, anyChange]);

    function handleCategoryChange(e) {
        setCategoryStyle(e.target.innerText);
        if(e.target.innerText === 'All') setCategory('get-notes');
        if(e.target.innerText === 'Active') setCategory('get-notes/?value=active');
        if(e.target.innerText === 'Latest') setCategory('latest-three');
        if(e.target.innerText === 'Hidden') setCategory('get-notes/?value=hidden');
    }
    async function handleMultiDelete() {
        await axios({
            method: "delete",
            url: `http://localhost:5001/notes/delete`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: multiDeleteNotes
        });
        setAnyChange(prev => !prev);
    }

    return <div className={styles.homeContainer}>
        <div className={styles.tasksCategorySection}>
            <div className={styles.tasksCategories}>
                <p onClick={handleCategoryChange} className={categoryStyle === 'All' ? styles.activeCategory : ''} >All</p>
                <p onClick={handleCategoryChange} className={categoryStyle === 'Active' ? styles.activeCategory : ''} >Active</p>
                <p onClick={handleCategoryChange} className={categoryStyle === 'Latest' ? styles.activeCategory : ''} >Latest</p>
                <p onClick={handleCategoryChange} className={categoryStyle === 'Hidden' ? styles.activeCategory : ''} >Hidden</p>
            </div>
            <div className={styles.buttons}>
                <button onClick={openAddTaskModal}>Add</button>
                <button onClick={handleMultiDelete}>Delete</button>
            </div>
        </div>
        <div className={styles.tasksContainer}>
            {categoryNotes.map(task => <TaskCard key={task._id} noteDetail={task} setAnyChange={setAnyChange} setMultiDeleteNotes={setMultiDeleteNotes} openAddTaskModal={openAddTaskModal} currentCategory={categoryStyle}/>)}
        </div>
    </div>
}

export default HomePage;