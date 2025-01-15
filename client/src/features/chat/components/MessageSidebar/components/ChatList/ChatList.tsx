import avatar from '../../../../../../assets/no-user-image.png'
import { IoMdHeartEmpty } from 'react-icons/io';
import { formatTimestamp } from '../../../../../../utils/formatTime';
import { useChatContext } from '../../../../context/chat.context';
import styles from './ChatList.module.scss';

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
    onlineUsers: any
}

export default function ChatList({ conversations, onlineUsers }: ConversationTypes) {
    const { setSelectedConversationId } = useChatContext();

    return (
        <div className={styles.chatList}>
            {conversations?.map((conversation) => (
                <div className={styles.item} key={conversation?._id} onClick={() => setSelectedConversationId(conversation?._id)}>
                    <div className={styles.profileImage}>
                        {onlineUsers?.includes(conversation?.user?._id) && <span className={styles.onlineElement}></span>}
                        <img src={conversation?.user?.profileImage || avatar} alt='avatar' className={styles.avatar} />
                    </div>
                    <div className={styles.message}>
                        <h4>{conversation?.user?.name}</h4>
                        <p>
                            {conversation?.lastMessage?.senderId !== conversation?.user?._id ? 'You: ' : `Him: `}
                            {conversation?.lastMessage?.message?.length > 34
                                ? `${conversation?.lastMessage?.message.slice(0, 34)}...`
                                : conversation?.lastMessage?.message}
                        </p>
                    </div>
                    <div className={styles.messageDetails}>
                        <span>{formatTimestamp(conversation?.lastMessage?.createdAt)}</span>
                        <IoMdHeartEmpty />
                    </div>
                </div>
            ))}
        </div>
    )
}
