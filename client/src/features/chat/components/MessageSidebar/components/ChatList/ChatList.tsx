import avatar from '../../../../../../assets/no-user-image.png'
import { IoMdHeartEmpty } from 'react-icons/io';
import styles from './ChatList.module.scss';

export default function ChatList() {
    return (
        <div className={styles.chatList}>
            {[1, 2, 3].map(item => (
                <div className={styles.item} key={item}>
                    <img src={avatar} alt='avatar' className={styles.avatar} />
                    <div className={styles.message}>
                        <h4>John Doe</h4>
                        <p>Hi there, how are you?</p>
                    </div>
                    <div className={styles.messageDetails}>
                        <span>19.12.2024 u 14:55</span>
                        <IoMdHeartEmpty />
                    </div>
                </div>
            ))}
        </div>
    )
}
