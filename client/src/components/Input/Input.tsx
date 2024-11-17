import { forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';

interface InputProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'radio' | 'file';
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    variant?: 'default' | 'error' | 'success' | 'checked';
    size?: 'small' | 'medium' | 'large';
    label?: string;
    id?: string;
    checked?: boolean;
    register?: UseFormRegister<FieldValues>;
    multiple?: boolean,
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type = 'text',
            placeholder = '',
            value = '',
            onChange,
            disabled = false,
            variant = 'default',
            size = 'medium',
            label = '',
            id,
        },
        ref
    ) => {
    return (
        <div className={styles.inputWrapper}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <input
                type={type}
                id={id}
                value={value}
                ref={ref}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                multiple
                className={`${styles.input} ${styles[`input--${variant}`]} ${styles[`input--${size}`]}`}
            />
        </div>
    );
});

export default Input;