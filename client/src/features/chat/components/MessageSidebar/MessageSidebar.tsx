import { useGetUserConversations } from '../../hooks/useChat';
import { MessageSidebarProps } from '../../types';
import ChatList from './components/ChatList/ChatList';
import FilterChat from './components/FilterChat/FilterChat';
import SearchChat from './components/SearchChat/SearchChat';
import ReactLoading from 'react-loading';
import styles from './MessageSidebar.module.scss';

export default function MessageSidebar({ onlineUsers }: MessageSidebarProps) {
    const { data: userConversations, isLoading: isLoadingUserConversations } = useGetUserConversations();

    if (isLoadingUserConversations) return <ReactLoading type={'spin'} color={'green'} height={'5rem'} width={'5rem'} className='loading_spinner' />

    return (
        <div className={styles.sidebar}>
            <SearchChat />
            <FilterChat />
            <ChatList conversations={userConversations?.data} onlineUsers={onlineUsers} />
        </div>
    )
}
