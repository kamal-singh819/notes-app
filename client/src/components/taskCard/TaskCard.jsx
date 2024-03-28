import styles from './TaskCard.module.scss';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
const TaskCard = ({ noteDetail }) => {
    const upp = "2024-03-21T05:51:33.677+00:00";
    const add = "2024-03-21T05:51:33.677+00:00";
    const updatedDate = upp.substring(0, 10);
    const updatedTime = upp.substring(11, 19);
    const addedDate = add.substring(0, 10);
    const addedTime = add.substring(11, 19);
    return <div className={styles.taskCard}>
        <div className={styles.icons}>
            <input type="checkbox" />
            <RiEditBoxLine />
            <MdDeleteForever />
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