import { Link } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import { FaCheckCircle, FaRegUserCircle } from "react-icons/fa";
import { GiHomeGarage } from "react-icons/gi";
import { Controller } from "react-hook-form";
import GroupSelection from "../GroupSelection/GroupSelection";
import { RoleSelectionProps } from "../../types";
import styles from './RoleSelection.module.scss';

export default function RoleSelection({ setActiveTab, errors, watch, control, handleSubmit }: RoleSelectionProps) {
    return (
        <div className={styles.selectionLayout}>
            <h2 className={styles.registerTitle}>Welcome to <span className={styles.titleSpan}>CarHub</span></h2>
            <p className={styles.registerSubTitle}>Join our community to easily connect with car service providers and manage your services seamlessly. It only takes a moment to get started</p>

            <span className={styles.line}></span>
            <h2 className={styles.title}>Select Your Purpose</h2>
            <div className={styles.options}>
                <Controller
                    control={control}
                    name="role"
                    rules={{ required: 'Please select a role' }}
                    render={({ field }) => (
                        <label
                            className={
                                field.value === 'customer'
                                    ? `${styles.option} ${styles.selectedOption}`
                                    : styles.option
                            }
                        >
                            {field.value === 'customer' && <FaCheckCircle className={styles.checkIcon} />}
                            <FaRegUserCircle className={styles.icon} />
                            <div className={styles.labelInput}>
                                <input
                                    type="radio"
                                    {...field}
                                    value="customer"
                                    checked={field.value === 'customer'}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                                Customer
                            </div>
                        </label>
                    )}
                />


                <Controller
                    control={control}
                    name="role"
                    rules={{ required: 'Please select a role' }}
                    render={({ field }) => (
                        <label
                            className={
                                field.value === 'serviceProvider'
                                    ? `${styles.option} ${styles.selectedOption}`
                                    : styles.option
                            }
                        >
                            {field.value === 'serviceProvider' && <FaCheckCircle className={styles.checkIcon} />}
                            <GiHomeGarage className={styles.icon} />
                            <div className={styles.labelInput}>
                                <input
                                    type="radio"
                                    {...field}
                                    value="serviceProvider"
                                    checked={field.value === 'serviceProvider'}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                                Service Provider
                            </div>
                        </label>
                    )}
                />

            </div>

            {watch('role') === 'serviceProvider' && (
                <GroupSelection control={control} />
            )}

            <Button type="button" onClick={handleSubmit(() => setActiveTab(1))}>Next</Button>

            {errors.role && <p className={styles.errorMessage}>{errors.role.message as string}</p>}
            {errors.group && <p className={styles.errorMessage}>{errors.group.message as string}</p>}

            <p className={styles.createAccountText}>
                Already have an account? <Link to='/auth/login'>Login</Link>
            </p>
        </div>
    );
}
