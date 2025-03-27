import { useChatContext } from '../../context/chat.context'
import ChatLayout from './components/MessageLayout/ChatLayout';
import NoChatLayout from './components/NoChatLayout/NoChatLayout'
import styles from './MessageLayout.module.scss'

export default function MessageLayout() {
    const { selectedConversationId, setSelectedConversationId } = useChatContext();

    return (
        <div className={selectedConversationId ? `${styles.messageLayout} ${styles.active}` : `${styles.messageLayout}`}>
            {!selectedConversationId ? (
                <NoChatLayout />
            ) : (
                <ChatLayout selectedConversationId={selectedConversationId} setSelectedConversationId={setSelectedConversationId} />
            )}
        </div>
    )
}
