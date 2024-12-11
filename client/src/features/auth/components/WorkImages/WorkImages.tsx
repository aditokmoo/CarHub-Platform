import { Control, FieldErrors, FieldValues, UseFormGetValues, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';
import Modal from '../../../../components/Modal/Modal';
import AddWorkImages from './components/AddWorkImages/AddWorkImages';
import Button from '../../../../components/Button/Button';
import { FaPlus } from 'react-icons/fa';
import ImageSlot from './components/ImageSlot/ImageSlot';
import useToggle from '../../../../hooks/useToggle';
import styles from './WorkImages.module.scss';

interface PropTypes {
    handleSubmit: UseFormHandleSubmit<FieldValues>,
    control: Control<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    setActiveTab: (val: number) => void;
    errors: FieldErrors<FieldValues>;
}

export default function WorkImages({ handleSubmit, control, setValue, getValues, setActiveTab, errors }: PropTypes) {
    const { isActive, toggle } = useToggle();
    const work = getValues("work") || [];

    return (
        <div className={styles.form}>
            <h2 className={styles.registerTitle}>Portoflio</h2>
            <p className={styles.registerDesc}>Add some images in your gallery to showcase your work and build trust for customers to choose you. They will be shown on your profile</p>


            <button className={styles.slotFields} onClick={() => toggle('addWorkImages')}><FaPlus /> Add Work</button>

            <ImageSlot data={work} />

            <div className={styles.btn}>
                <Button size="medium" onClick={handleSubmit(() => setActiveTab(3))}>Next</Button>
            </div>

            <p className={styles.goBackText}>
                Want to return back, and change your personal details? <button className={styles.backLink} onClick={() => setActiveTab(1)}>Back</button>
            </p>

            {isActive.addWorkImages && (
                <Modal>
                    <AddWorkImages control={control} toggle={() => toggle('addWorkImages')} errors={errors} getValues={getValues} setValue={setValue} handleSubmit={handleSubmit} />
                </Modal>
            )}
        </div>
    )
}
