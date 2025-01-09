import NoMessage from '../../../../../../assets/message-image.png'
import styles from './NoChatLayout.module.scss';

export default function NoChatLayout() {
    return (
        <div className={styles.emptyLayout}>
            <img src={NoMessage} className={styles.image} alt="" />
            <h3>Select a conversation to view detailed messages</h3>
        </div>
    )
}
