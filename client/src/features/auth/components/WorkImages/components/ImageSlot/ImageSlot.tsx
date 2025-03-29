import { IoMdClose } from 'react-icons/io';
import { ImageSlotProps } from '../../../../types';
import styles from './ImageSlot.module.scss';

export default function ImageSlot({ data, handleDeleteWork }: ImageSlotProps) {
    return (
        <div className={styles.slotLayout}>
            {data?.map((slot, index) => (
                <div key={index} className={styles.slot}>
                    <span className={styles.removeBtn} onClick={() => handleDeleteWork(index)}><IoMdClose /></span>
                    <img src={URL.createObjectURL(slot.images[0])} alt="" className={styles.image} />
                    <div className={styles.textLayout}>
                        <h4><strong>{slot.workTitle}</strong></h4>
                        <p>{slot.workDescription.slice(0, 70)}...</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
