import styles from './Button.module.scss';

interface ButtonProps {
    children: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
}) => {
    return (
        <button
            className={`${styles.btn} ${styles[`btn--${variant}`]} ${styles[`btn--${size}`]} ${loading ? styles['btn--loading'] : ''}`}
            onClick={onClick}
            type={type}
            disabled={disabled || loading}
        >
            {loading ? <span className={styles['btn__spinner']}></span> : children}
        </button>
    );
};

export default Button;