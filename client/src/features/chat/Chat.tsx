import MessageLayout from './components/MessageLayout/MessageLayout'
import MessageSidebar from './components/MessageSidebar/MessageSidebar'
import { ChatProvider } from './context/chat.context'
import { useAuthContext } from '../auth/context/auth.context'
import { useEffect } from 'react'
import useSocket from '../../hooks/useSocket'
import styles from './Chat.module.scss'

export default function Chat() {
    const { state } = useAuthContext();
    const { socket, onlineUsers } = useSocket(state.currentUser!);

    useEffect(() => {
        if (socket) {
            socket.emit('addNewChatUser');
            socket.on('getChatUsers', (data) => {
                console.log(data);
            });
        }
    }, [socket, onlineUsers]);

    return (
        <ChatProvider>
            <div className={styles.chatLayout}>
                <div className="container">
                    <div className={styles.layout}>
                        <MessageSidebar onlineUsers={onlineUsers} />
                        <MessageLayout />
                    </div>
                </div>
            </div>
        </ChatProvider>
    )
}
