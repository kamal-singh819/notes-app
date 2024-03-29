import styles from './Button.module.scss';
const Button = ({ name, bgColor, openAddTaskModal }) => {
    return <button className={styles.button} style={{ backgroundColor: bgColor }} onClick={openAddTaskModal}>{name}</button>
}

export default Button;