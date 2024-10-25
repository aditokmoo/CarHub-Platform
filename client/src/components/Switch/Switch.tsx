import { useState } from 'react';
import styles from './Switch.module.scss';

interface PropTypes {
    label: string,
    isToggled: boolean,
    setIsToggled: (isToggled: boolean) => void
}

export default function Switch({ label, isToggled, setIsToggled }: PropTypes) {
    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <label className={`${styles.switch} ${isToggled ? styles.toggled : ''}`}>
            <input type="checkbox" checked={isToggled} onChange={handleToggle} />
            <span className={styles.slider}></span>
            <span className={styles.label}>{label}</span>
        </label>
    );
}
