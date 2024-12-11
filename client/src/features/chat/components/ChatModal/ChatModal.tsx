import Modal from "../../../../components/Modal/Modal";
import styles from './ChatModal.module.scss';
import { IoCloseOutline } from "react-icons/io5";

interface PropTypes {
    toggle: () => void,
    userName: string,
}

export default function ChatModal({ toggle, userName }: PropTypes) {
    return (
        <Modal>
            <h3 className={styles.modalTitle}>Poruka za {userName}</h3>
            <button onClick={toggle} className={styles.closeBtn}><IoCloseOutline /></button>
            <textarea className={styles.message} placeholder={`Send message to ${userName}`}></textarea>
            <div className={styles.cta}>
                <button className={styles.cancelBtn} onClick={toggle}>Cancel</button>
                <button type="submit" onClick={() => console.log('helloo')} className={styles.sendBtn}>Send</button>
            </div>
        </Modal>
    )
}
