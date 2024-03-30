import styles from './TaskCard.module.scss';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';

const TaskCard = ({ noteDetail, setAnyChange, setMultiDeleteNotes, openAddTaskModal, currentCategory }) => {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
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
        console.log("delete single");
    }
    async function handleHide(currentId) {
        await axios({
            method: "put",
            url: `http://localhost:5001/notes/hide/?id=${currentId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setAnyChange(prev => !prev);
    }

    async function handleEditTask(noteToEdit) {
        openAddTaskModal();
    }

    function handleCheckBox(e, currentId) {
        if(e.target.checked) setMultiDeleteNotes(prev => [...prev, currentId]);
        else setMultiDeleteNotes(prev => [...prev].filter(ele => ele !== currentId));
    }

    return <div className={styles.taskCard} style={noteDetail.isHide ? {backgroundColor: "#ffe5ec"} : {backgroundColor: "#caf0f8"}}>
        <div className={styles.icons}>
            <input type="checkbox" onClick={(e) => handleCheckBox(e, noteDetail._id)} />
            <button onClick={() => handleHide(noteDetail._id)} className={styles.hideUnhideButton} style={noteDetail.isHide ? {backgroundColor: "#ffffff"}:{backgroundColor: "#fca311"}}>{noteDetail.isHide ? "UNHIDE": "HIDE"}</button>
            <RiEditBoxLine onClick={() => handleEditTask(noteDetail)}/>
            <MdDeleteForever onClick={() => handleDelete(noteDetail._id)} />
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