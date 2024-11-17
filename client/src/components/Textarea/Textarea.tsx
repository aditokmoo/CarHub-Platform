import { forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './Textarea.module.scss';

interface TextAreaProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    variant?: 'default' | 'error' | 'success' | 'checked';
    size?: 'small' | 'medium' | 'large';
    label?: string;
    id?: string;
    register?: UseFormRegister<FieldValues>;
    rows?: number;
    cols?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            placeholder = '',
            value = '',
            onChange,
            disabled = false,
            variant = 'default',
            size = 'medium',
            label = '',
            id,
            rows,
            cols,
        },
        ref
    ) => {
        return (
            <div className={styles.textareaWrapper}>
                {label && <label htmlFor={id} className={styles.label}>{label}</label>}
                <textarea
                    id={id}
                    value={value}
                    ref={ref}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={rows}
                    cols={cols}
                    className={`${styles.textarea} ${styles[`textarea--${variant}`]} ${styles[`textarea--${size}`]}`}
                />
            </div>
        );
    }
);

export default Textarea;