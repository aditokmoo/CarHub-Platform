import { Control, Controller, FieldErrors, FieldValues, UseFormHandleSubmit, UseFormWatch } from 'react-hook-form';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Select from 'react-select';
import { useState } from 'react';
import defaultProfileImage from '../../../../assets/no-user-image.png';
import styles from './PersonalDetails.module.scss';
import Modal from '../../../../components/Modal/Modal';
import AddWorkImages from './components/AddWorkImages';

interface PropTypes {
    control: Control<FieldValues>,
    errors: FieldErrors<FieldValues>;
    setActiveTab: (val: number) => void,
    handleSubmit: UseFormHandleSubmit<FieldValues>,
    watch: UseFormWatch<FieldValues>,
}

const options = [
    { value: '', label: 'Select your location' },
    { value: 'Kakanj', label: 'Kakanj' },
    { value: 'Sarajevo', label: 'Sarajevo' },
    { value: 'Zenica', label: 'Zenica' },
    { value: 'Vitez', label: 'Vitez' },
];

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        fontSize: '13px',
        padding: '.6rem 0'
    })
}

export default function PersonalDetails({ control, errors, setActiveTab, handleSubmit, watch }: PropTypes) {
    const [ selectedImage, setSelectedImage ] = useState<File | null>(null);
    const [ activeModal, setActiveModal ] = useState(false);

    console.log(selectedImage)
    const userRole = watch('role');
    console.log(errors)
    return (
        <div className={styles.form}>
            <h2 className={styles.registerTitle}>Personal Details</h2>

            <div className={styles.profileImage}>
                <label htmlFor="profileImage" style={{ backgroundImage: `url(${selectedImage ? URL.createObjectURL(selectedImage) : defaultProfileImage})` }} className={errors?.profileImage ? `${styles.label} ${styles.error}` : styles.label}></label>
                <Controller
                    control={control}
                    name="profileImage"
                    rules={{ required: 'Profile image is required' }}
                    render={({ field }) => (
                        <input
                            type="file"
                            id='profileImage'
                            onChange={(e) => {
                                const selectedFile = e.target.files ? e.target.files[0] : null;
                                setSelectedImage(selectedFile);
                                field.onChange(selectedFile);
                            }}
                            className={styles.fileInput}
                        />
                    )}
                />
            </div>

            <div className={styles.inputField}>
                <Controller
                    control={control}
                    name="phoneNumber"
                    rules={{ required: 'Phone number is required' }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="+387"
                            label="Phone number*"
                            type="number"
                            size="large"
                            variant={errors.phoneNumber ? 'error' : 'default'}
                        />
                    )}
                />
                {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber.message as string}</p>}
            </div>

            <div className={styles.inputField}>
                <label htmlFor="location">Location*</label>
                <Controller
                    control={control}
                    name="location"
                    rules={{
                        required: 'Location is required',
                        validate: (value) => value?.value !== '' || 'Please select a valid location',
                    }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={options}
                            styles={{
                                ...customStyles,
                                control: (provided) => ({
                                    ...provided,
                                    padding: '0.3rem 0',
                                    borderColor: errors.location ? 'red' : provided.borderColor,
                                    '&:hover': {
                                        borderColor: errors.location ? 'red' : provided.borderColor,
                                    }
                                }),
                            }}
                            id='location'
                        />
                    )}
                />
                {errors.location && <p className={styles.errorMessage}>{errors.location.message as string}</p>}
            </div>

            {userRole === 'serviceProvider' && (
                <button className={styles.slotFields} onClick={() => setActiveModal(true)}>Add Work Images</button>                
            )}

            <div className={styles.btn}>
                <Button size="medium" onClick={handleSubmit(() => setActiveTab(2))}>Next</Button>
            </div>

            <p className={styles.goBackText}>
                Want to return back, and change your role? <span className={styles.backLink} onClick={() => setActiveTab(0)}>Back</span>
            </p>

            {activeModal && (
                <Modal>
                    <AddWorkImages />
                </Modal>
            )}
        </div>
    );
}