import styles from './Switch.module.scss';

interface PropTypes {
    label: string,
    isToggled: boolean,
    setIsToggled: (key: string) => void
}

export default function Switch({ label, isToggled, setIsToggled }: PropTypes) {
    const handleToggle = () => {
        setIsToggled('filterByCarDetails');
    };

    return (
        <label className={`${styles.switch} ${isToggled ? styles.toggled : ''}`}>
            <input type="checkbox" checked={isToggled} onChange={handleToggle} />
            <span className={styles.slider}></span>
            <span className={styles.label}>{label}</span>
        </label>
    );
}
