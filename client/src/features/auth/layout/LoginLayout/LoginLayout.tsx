import { useLogin } from '../../api/hooks/useAuth'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/Input'
import GoogleIcon from '../../../../assets/google-logo-icon.webp'
import AppleIcon from '../../../../assets/apple-logo-icon.png'
import { User } from '../../types'
import styles from './LoginLayout.module.scss'

export default function LoginLayout() {
    const { control, handleSubmit, formState: { errors } } = useForm<User>({
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const { mutate: login, isPending: isLogging } = useLogin();

    return (
        <div className={styles.loginLayout}>
            <h2 className={styles.loginTitle}>Welcome Back</h2>
            <div className={styles.loginOptions}>
                <Link to='/'><img src={GoogleIcon} alt="" /> Sign in with Google</Link>
                <Link to='/'><img src={AppleIcon} alt="" /> Sign in with Apple ID</Link>
            </div>

            <span className={styles.or_text}>OR</span>

            <form className={styles.loginForm} onSubmit={handleSubmit((data) => login(data))}>
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
                    {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
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
                    {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
                </div>
                <Button size="medium" type="submit" loading={isLogging}>Login</Button>
            </form>

            <p>Don't have account? <Link to='/auth/register'>Create account</Link></p>
        </div>
    )
}
