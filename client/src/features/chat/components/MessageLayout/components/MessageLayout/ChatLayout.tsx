import Messages from '../Messages/Messages'
import MessageInput from '../MessageInput/MessageInput'
import { useGetConversation } from '../../../../hooks/useChat';
import styles from './ChatLayout.module.scss';

interface PropTypes {
    selectedConversationId: string
}

export default function ChatLayout({ selectedConversationId }: PropTypes) {
    const { data: conversationData, isLoading: isLoadingConversation } = useGetConversation(selectedConversationId);

    if (isLoadingConversation) return <h2>Loading...</h2>

    console.log(conversationData)

    return (
        <>
            <div className={styles.header}>
                <img src={conversationData?.conversation.members[0].profileImage} alt="" />
                <h3>{conversationData?.conversation.members[0].name}</h3>
            </div>
            <Messages data={conversationData.conversation} />
            <MessageInput />
        </>
    )
}
