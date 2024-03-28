import styles from './Button.module.scss';
const Button = ({ name, bgColor }) => {
    return <button className={styles.button} style={{ backgroundColor: bgColor }}>{name}</button>
}

export default Button;