import Modal from 'react-modal';
import styles from './addTask.module.scss';
import { useRef } from 'react';
import axios from 'axios';


const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#root');

const AddNewTask = ({ addTaskModal, setAddTaskModal, setAnyChange }) => {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    const titleRef = useRef();
    const descriptionRef = useRef();

    function closeModal() {
        setAddTaskModal(false);
    }

    async function addTaskApiCall(title, description) {
        try {
            const response = await axios({
                method: 'post',
                url: `http://localhost:5001/notes/upload`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { title, description }
            })
            console.log(response.data.message);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    function handleAddTaskForm(e) {
        e.preventDefault();
        if (!titleRef.current.value.trim() || !descriptionRef.current.value.trim()) {
            console.log("Title and Description is mandatory");
            return;
        }
        addTaskApiCall(titleRef.current.value.trim(), descriptionRef.current.value.trim());
        setAddTaskModal(false);
        setAnyChange(prev => !prev);
    }

    return <>
        <div>
            <Modal isOpen={addTaskModal} onRequestClose={closeModal} style={modalStyle} contentLabel='Add Task Modal'>
                <button onClick={closeModal} className={styles.modalCloseButton}>X</button>
                <form onSubmit={handleAddTaskForm} className={styles.addTaskForm}>
                    <input ref={titleRef} type="text" placeholder='Title' />
                    <textarea ref={descriptionRef} rows="4" placeholder='Description'></textarea>
                    <button type='submit'>ADD TASK</button>
                </form>
            </Modal>
        </div>
    </>
}

export default AddNewTask;