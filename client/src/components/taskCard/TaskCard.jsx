import styles from './TaskCard.module.scss';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineHideImage } from "react-icons/md";
import axios from 'axios';

const TaskCard = ({ noteDetail, setAnyChange, setHideNotes, openAddTaskModal }) => {
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

    function handleCheckBox(currentId) {
        setHideNotes(prev => [...prev, currentId]);
    }

    return <div className={styles.taskCard} style={noteDetail.isHide ? {backgroundColor: "#ff99c8"} : {backgroundColor: "#a9def9"}}>
        <div className={styles.icons}>
            <input type="checkbox" onClick={() => handleCheckBox(noteDetail._id)} />
            <MdOutlineHideImage onClick={() => handleHide(noteDetail._id)}/>
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