import Messages from '../Messages/Messages'
import MessageInput from '../MessageInput/MessageInput'
import { useGetConversation, useListenMessages } from '../../../../hooks/useChat';
import styles from './ChatLayout.module.scss';

interface PropTypes {
    selectedConversationId: string
}

export default function ChatLayout({ selectedConversationId }: PropTypes) {
    const { data: conversationData, isLoading: isLoadingConversation } = useGetConversation(selectedConversationId);

    useListenMessages(conversationData?.conversation?._id);

    if (isLoadingConversation) return <h2>Loading...</h2>

    return (
        <>
            <div className={styles.header}>
                <img src={conversationData?.conversation?.members[1]?.profileImage} alt="" />
                <h3>{conversationData?.conversation?.members[1]?.name}</h3>
            </div>
            <Messages data={conversationData?.conversation} />
            <MessageInput receiverId={conversationData?.conversation?.members[1]?._id} />
        </>
    )
}
