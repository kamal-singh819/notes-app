import styles from './TaskCard.module.scss';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import { useState } from 'react';
const TaskCard = ({ noteDetail, setAnyChange, setHideNotes }) => {
    const token = localStorage.getItem("accessToken");
    const updatedDate = noteDetail.updatedAt.substring(0, 10);
    const updatedTime = noteDetail.updatedAt.substring(11, 19);
    const addedDate = noteDetail.createdAt.substring(0, 10);
    const addedTime = noteDetail.createdAt.substring(11, 19);

    async function handleDelete(currentId) {
        await axios({
            method: "delete",
            url: `http://localhost:5001/notes/delete/?id=${currentId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setAnyChange(prev => !prev);
    }

    function handleCheckBox(e, currentId) {
        console.log(e.target.checked);
        console.log(currentId);
        setHideNotes(prev => [...prev, currentId]);
    }

    return <div className={styles.taskCard}>
        <div className={styles.icons}>
            <input type="checkbox" onClick={(e) => handleCheckBox(e, noteDetail._id)} />
            <RiEditBoxLine />
            <MdDeleteForever onClick={() => { handleDelete(noteDetail._id) }} />
        </div>
        <div className={styles.content}>
            <h2>{noteDetail.title}</h2>
            <p>{noteDetail.description}</p>
        </div>
        <div className={styles.addUpdateDate}>
            <p>Created At: {addedDate} {addedTime}IST</p>
            <p>Updated At: {updatedDate} {updatedTime}IST</p>
        </div>
    </div>
}

export default TaskCard;