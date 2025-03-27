import { MdKeyboardArrowLeft } from 'react-icons/md';
import styles from './MessageHeader.module.scss';

interface MessageHeaderProps {
    receiver: any,
    setSelectedConversationId: (id: string | null) => void
}

export default function MessageHeader({ receiver, setSelectedConversationId }: MessageHeaderProps) {
    return (
        <div className={styles.header}>
            <span className={styles.returnIcon} onClick={() => setSelectedConversationId(null)}><MdKeyboardArrowLeft /></span>
            <img src={receiver?.profileImage} alt="" />
            <h3>{receiver?.name}</h3>
        </div>
    )
}
