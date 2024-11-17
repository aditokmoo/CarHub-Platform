import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import Input from '../../../../components/Input/Input'
import { Link } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
// Icons
import GoogleIcon from '../../../../assets/google-logo-icon.webp';
import AppleIcon from '../../../../assets/apple-logo-icon.png';
// SCSS
import styles from './RegisterForm.module.scss';

interface PropTypes {
    control: Control<FieldValues>;
    errors: FieldErrors<FieldValues>;
    setActiveTab: (val: number) => void;
    isLoading: boolean;
}

export default function RegisterForm({ control, errors, setActiveTab, isLoading }: PropTypes) {
    return (
        <div className={styles.form}>
            <h2 className={styles.registerTitle}>Create account</h2>
            <div className={styles.registerOptions}>
                <Link to='/'><img src={GoogleIcon} alt="Google Icon" /> Sign up with Google</Link>
                <Link to='/'><img src={AppleIcon} alt="Apple Icon" /> Sign up with Apple ID</Link>
            </div>

            <span className={styles.or_text}>OR</span>

            <div className={styles.inputField}>
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="John Doe"
                            label="Name*"
                            size="large"
                            variant={errors.name ? 'error' : 'default'}
                        />
                    )}
                />
                {errors.name && <p className={styles.errorMessage}>{errors.name.message as string}</p>}
            </div>

            <div className={styles.inputField}>
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: 'Enter a valid email address'
                        }
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="user@mail.com"
                            label="Email*"
                            size="large"
                            variant={errors.email ? 'error' : 'default'}
                        />
                    )}
                />
                {errors.email && <p className={styles.errorMessage}>{errors.email.message as string}</p>}
            </div>

            <div className={styles.inputField}>
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="*******"
                            type="password"
                            label="Password*"
                            size="large"
                            variant={errors.password ? 'error' : 'default'}
                        />
                    )}
                />
                {errors.password && <p className={styles.errorMessage}>{errors.password.message as string}</p>}
            </div>

            <Button size="medium" type="submit" loading={isLoading}>Register</Button>
            
            <p className={styles.goBackText}>Want to return back, and change your description? <span className={styles.backLink} onClick={() => setActiveTab(3)}>Back</span></p>
        </div>
    )
}
