import { IoMdClose } from 'react-icons/io';
import styles from './ImageSlot.module.scss';

interface PropTypes {
    data: {
        title: string,
        description: string,
        workImages: File[],
    }[]
}

export default function ImageSlot({ data }: PropTypes) {
    return (
        <div className={styles.slotLayout}>
            {data?.map((slot, index) => (
                    <div key={index} className={styles.slot}>
                        <span className={styles.removeBtn}><IoMdClose /></span>
                        <img src={URL.createObjectURL(slot.workImages[0])} alt="" className={styles.image} />
                        <div className={styles.textLayout}>
                            <h4><strong>{slot.title}</strong></h4>
                            <p>{slot.description.slice(0, 70)}...</p>
                        </div>
                    </div>
                ))}
        </div>
    )
}
