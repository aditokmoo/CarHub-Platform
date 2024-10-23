import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

export default function Modal({ children }: { children: React.ReactNode }) {
    const portalElement = document.getElementById('portal');
    
    if (!portalElement) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={styles.modalLayout}>
                {children}
            </div>
        </div>,
        portalElement
    );
}