import styles from './MessageLayout.module.scss'
import NoMessage from '../../../../assets/message-image.png'

export default function MessageLayout() {
    return (
        <div className={styles.messageLayout}>
            <div className={styles.emptyLayout}>
                <img src={NoMessage} className={styles.image} alt="" />
                <h3>Select a conversation to view detailed messages</h3>
            </div>
        </div>
    )
}
