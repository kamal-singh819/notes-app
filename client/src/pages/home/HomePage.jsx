import styles from './Home.module.scss';
import TaskCard from '../../components/taskCard/TaskCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ openAddTaskModal, categoryNotes, setCategoryNotes, anyChange, setAnyChange }) => {
    const [category, setCategory] = useState('get-notes'); //by default get all the notes
    const [hideNotes, setHideNotes] = useState([]);
    const token = localStorage.getItem("accessToken");
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

    async function handleHide() {
        if (isLoggedIn) {
            await axios({
                method: 'put',
                url: `http://localhost:5001/notes/hide`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: hideNotes
            });
            setAnyChange(prev => !prev);
        }
    }

    return <div className={styles.homeContainer}>
        <div className={styles.tasksCategorySection}>
            <div className={styles.tasksCategories}>
                <p onClick={() => setCategory('get-notes')}>All</p>
                <p onClick={() => setCategory('get-notes/?value=active')}>Active</p>
                <p onClick={() => setCategory('latest-three')}>Latest</p>
                <p onClick={() => setCategory('get-notes/?value=hidden')}>Hidden</p>
            </div>
            <div className={styles.buttons}>
                <button onClick={openAddTaskModal}>Add</button>
                <button>Delete</button>
                <button onClick={handleHide}>Hide</button>
            </div>
        </div>
        <div className={styles.tasksContainer}>
            {categoryNotes.map(task => <TaskCard key={task._id} noteDetail={task} setAnyChange={setAnyChange} setHideNotes={setHideNotes} />)}
        </div>
    </div>
}

export default HomePage;