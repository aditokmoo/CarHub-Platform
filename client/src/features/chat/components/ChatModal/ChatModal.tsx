import Modal from "../../../../components/Modal/Modal";
import { ChatModalProps } from "../../types";
import { IoCloseOutline } from "react-icons/io5";
import styles from './ChatModal.module.scss';

export default function ChatModal({ toggle, userName }: ChatModalProps) {
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
