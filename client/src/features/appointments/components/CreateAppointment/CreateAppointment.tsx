import { Controller, useForm } from 'react-hook-form';
import Modal from '../../../../components/Modal/Modal';
import styles from './CreateAppointment.module.scss';
import Select from 'react-select';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface PropTypes {
    toggle: () => void,
}

const options = [];

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        fontSize: '13px',
        padding: '.6rem 0'
    })
}

export default function CreateAppointment({ toggle }: PropTypes) {
    const { register, control, formState: { errors } } = useForm();

    return (
        <Modal>
            <h2 className={styles.modalTitle}>Create Appointment</h2>

            <div className={styles.details}>
                <h4 className={styles.label}>Service Provider/Customer Details *</h4>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <img src="" alt="" />
                        <div className={styles.info}>
                            <h3>Adi Tokmo</h3>
                            <p>Service Provider</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <img src="" alt="" />
                        <div className={styles.info}>
                            <h3>John Doe</h3>
                            <p>Customer</p>
                        </div>
                    </div>
                </div>

                <form className={styles.form}>
                    <div className={styles.twoColumn}>
                        <div className={styles.col}>
                            <div className={styles.inputField}>
                                <label htmlFor="time">Choose your time *</label>
                                <Controller
                                    control={control}
                                    name="time"
                                    rules={{
                                        required: 'Time is required',
                                        validate: (value) => value?.value !== '' || 'Please select a valid time',
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type='time'
                                        />
                                    )}
                                />
                                {errors.time && <p className={styles.errorMessage}>{errors.time.message as string}</p>}
                            </div>

                            <div className={styles.inputField}>
                                <label htmlFor="service">Choose service that provider offers *</label>
                                <Controller
                                    control={control}
                                    name="service"
                                    rules={{
                                        required: 'Service is required',
                                        validate: (value) => value?.value !== '' || 'Please select a valid service',
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={options}
                                            styles={{
                                                ...customStyles,
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    padding: '0.3rem 0',
                                                    borderColor: errors.service ? 'red' : provided.borderColor,
                                                    '&:hover': {
                                                        borderColor: errors.service ? 'red' : provided.borderColor,
                                                    }
                                                }),
                                            }}
                                            id='service'
                                        />
                                    )}
                                />
                                {errors.service && <p className={styles.errorMessage}>{errors.service.message as string}</p>}
                            </div>

                            <div className={styles.inputField}>
                                <label htmlFor="service">Note for Service Provider *</label>
                                <Controller
                                    control={control}
                                    name="service"
                                    rules={{
                                        required: 'Service is required',
                                        validate: (value) => value?.value !== '' || 'Please select a valid service',
                                    }}
                                    render={({ field }) => (
                                        <textarea />
                                    )}
                                />
                                {errors.service && <p className={styles.errorMessage}>{errors.service.message as string}</p>}
                            </div>
                        </div>

                        <div className={styles.col}>
                            <Calendar
                                className={styles.calendar}
                            />
                        </div>
                    </div>

                    <div className={styles.btns}>
                        <button onClick={toggle}>Cancel</button>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
