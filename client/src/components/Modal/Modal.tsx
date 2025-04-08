import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

export default function Modal({ children, type }: { children: React.ReactNode, type: 'full-screen' }) {
    const portalElement = document.getElementById('portal');

    if (!portalElement) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={type === 'full-screen' ? `${styles.fullModalLayout}` : styles.modalLayout}>
                {children}
            </div>
        </div>,
        portalElement
    );
}