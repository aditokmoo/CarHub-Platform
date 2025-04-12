import { IoCloseOutline } from 'react-icons/io5'
import styles from './MyCarModal.module.scss'

interface PropTypes {
    toggle: (key: string) => void
}

export default function MyCarModal({ toggle }: PropTypes) {
    return (
        <div className={styles.modalLayout}>
            <div className={styles.header}>
                <h3>My Car</h3>
                <button className={styles.closeModal} onClick={() => toggle('myCarFilterModal')}><IoCloseOutline /></button>
            </div>
        </div>
    )
}
