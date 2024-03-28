import styles from './Home.module.scss';
import TaskCard from '../../components/taskCard/TaskCard';
import Button from '../../components/button/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';


const HomePage = () => {
    const [categoryNotes, setCategoryNotes] = useState([]);
    const [category, setCategory] = useState('search'); //by default get all the notes
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVhZGVkOTNkMzE1Y2JiOWE5MWZhOCIsImlhdCI6MTcxMTY0ODI3MSwiZXhwIjoxNzExNjgwNjcxfQ.qEWkbyvfDDh7lUNU-PMc8AMgP-mPxZHWkVJwROdPSTM";

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:5001/notes/${category}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategoryNotes(response.data.data);
        }
        fetchData();
    }, [category]);


    return <div className={styles.homeContainer}>
        <div className={styles.tasksCategorySection}>
            <div className={styles.tasksCategories}>
                <p onClick={() => setCategory('search')}>All</p>
                <p onClick={() => setCategory('search/?value=active')}>Active</p>
                <p onClick={() => setCategory('latest-three')}>Latest</p>
                <p onClick={() => setCategory('search/?value=hidden')}>Hidden</p>
            </div>
            <div className={styles.buttons}>
                <Button name={"Delete"} bgColor={"#780000"} />
                <Button name={"Hide"} bgColor={"#fca311"} />
            </div>
        </div>
        <div className={styles.tasksContainer}>
            {categoryNotes.map((task, idx) => <TaskCard key={idx} noteDetail={task} />)}
        </div>
    </div>
}

export default HomePage;