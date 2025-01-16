import Messages from '../Messages/Messages'
import MessageInput from '../MessageInput/MessageInput'
import { useGetConversation } from '../../../../hooks/useChat';
import { ChatLayoutProps } from '../../../../types';
import styles from './ChatLayout.module.scss';

export default function ChatLayout({ selectedConversationId }: ChatLayoutProps) {
    const { data: conversationData, isLoading: isLoadingConversation } = useGetConversation(selectedConversationId);

    if (isLoadingConversation) return <h2>Loading...</h2>

    return (
        <>
            <div className={styles.header}>
                <img src={conversationData?.data?.members[1]?.profileImage} alt="" />
                <h3>{conversationData?.data?.members[1]?.name}</h3>
            </div>
            <Messages data={conversationData?.data} />
            <MessageInput receiverId={conversationData?.data?.members[1]?._id!} />
        </>
    )
}
