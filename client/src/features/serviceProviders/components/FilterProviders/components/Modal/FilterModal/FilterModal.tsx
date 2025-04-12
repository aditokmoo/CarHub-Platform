import { IoCloseOutline } from 'react-icons/io5'
import styles from './FilterModal.module.scss'

interface PropTypes {
    toggle: (modal: string) => void
}

export default function FilterModal({ toggle }: PropTypes) {
    return (
        <div className={styles.modalLayout}>
            <div className={styles.header}>
                <h3>Filters</h3>
                <button className={styles.closeModal} onClick={() => toggle('filterModal')}><IoCloseOutline /></button>
            </div>
        </div>
    )
}
