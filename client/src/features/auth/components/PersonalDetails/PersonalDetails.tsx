import { Control, Controller, FieldErrors, FieldValues, UseFormHandleSubmit, UseFormWatch } from 'react-hook-form';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Select from 'react-select';
import { useState } from 'react';
import defaultProfileImage from '../../../../assets/no-user-image.png';
import Modal from '../../../../components/Modal/Modal';
import AddWorkImages from './components/AddWorkImages';
import { personalDetailsInputFields } from '../../../../lib/InputFields';
import styles from './PersonalDetails.module.scss';

interface PropTypes {
    control: Control<FieldValues>,
    errors: FieldErrors<FieldValues>;
    setActiveTab: (val: number) => void,
    handleSubmit: UseFormHandleSubmit<FieldValues>,
    watch: UseFormWatch<FieldValues>,
}

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        fontSize: '13px',
        padding: '.6rem 0'
    })
}

export default function PersonalDetails({ control, errors, setActiveTab, handleSubmit, watch }: PropTypes) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [activeModal, setActiveModal] = useState(false);

    const userRole = watch('role');

    console.log(personalDetailsInputFields)

    return (
        <div className={styles.form}>
            <h2 className={styles.registerTitle}>Personal Details</h2>

            {personalDetailsInputFields.map((inputField) => (
                <div key={inputField.name} className={styles.inputField}>
                    {inputField.type === "file" ? (
                        <div className={styles.profileImage}>
                            <label
                                htmlFor={inputField.name}
                                style={{ backgroundImage: `url(${selectedImage ? URL.createObjectURL(selectedImage) : defaultProfileImage})` }}
                                className={errors?.[inputField.name] ? `${styles.label} ${styles.error}` : styles.label}
                            ></label>
                            <Controller
                                control={control}
                                name={inputField.name}
                                rules={inputField.rules}
                                render={({ field }) => (
                                    <input
                                        type="file"
                                        id={field.name}
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
                    ) : inputField.type === "select" ? (
                        <>
                            <label htmlFor={inputField.name}>{inputField.label}</label>
                            <Controller
                                control={control}
                                name={inputField.name}
                                rules={inputField.rules}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={inputField.options}
                                        styles={{
                                            ...customStyles,
                                            control: (provided) => ({
                                                ...provided,
                                                padding: '0.3rem 0',
                                                borderColor: errors[field.name] ? 'red' : provided.borderColor,
                                                '&:hover': {
                                                    borderColor: errors[field.name] ? 'red' : provided.borderColor,
                                                },
                                            }),
                                        }}
                                        id={field.name}
                                    />
                                )}
                            />
                        </>
                    ) : (
                        <Controller
                            control={control}
                            name={inputField.name}
                            rules={inputField.rules}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder={inputField.placeholder}
                                    label={inputField.label}
                                    type={inputField.type}
                                    size="large"
                                    variant={errors[field.name] ? 'error' : 'default'}
                                />
                            )}
                        />
                    )}
                    {errors[inputField.name] && (
                        <p className={styles.errorMessage}>{errors[inputField.name].message as string}</p>
                    )}
                </div>
            ))}

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