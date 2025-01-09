import avatar from '../../../../../../assets/no-user-image.png'
import { IoMdHeartEmpty } from 'react-icons/io';
import styles from './ChatList.module.scss';
import { formatTimestamp } from '../../../../../../utils/formatTime';
import { useChatContext } from '../../../../context/chat.context';

interface Conversation {
    _id: string;
    user: {
        _id: string,
        name: string,
        profileImage: string
    }
    lastMessage: {
        message: string,
        senderId: string,
        receiverId: string,
        createdAt: string
    }
}

interface ConversationTypes {
    conversations: Conversation[],
}

export default function ChatList({ conversations }: ConversationTypes) {
    const { setSelectedConversationId } = useChatContext();

    return (
        <div className={styles.chatList}>
            {conversations?.map((conversation) => (
                <div className={styles.item} key={conversation._id} onClick={() => setSelectedConversationId(conversation._id)}>
                    <img src={conversation.user.profileImage || avatar} alt='avatar' className={styles.avatar} />
                    <div className={styles.message}>
                        <h4>{conversation.user.name}</h4>
                        <p>
                            {conversation.lastMessage.senderId !== conversation.user._id ? 'You: ' : `Him: `}
                            {conversation.lastMessage.message.length > 34
                                ? `${conversation.lastMessage.message.slice(0, 34)}...`
                                : conversation.lastMessage.message}
                        </p>
                    </div>
                    <div className={styles.messageDetails}>
                        <span>{formatTimestamp(conversation.lastMessage.createdAt)}</span>
                        <IoMdHeartEmpty />
                    </div>
                </div>
            ))}
        </div>
    )
}
