import MessageLayout from './components/MessageLayout/MessageLayout'
import MessageSidebar from './components/MessageSidebar/MessageSidebar'
import styles from './Chat.module.scss'
import { ChatProvider } from './context/chat.context'

export default function Chat() {
    return (
        <ChatProvider>
            <div className={styles.chatLayout}>
                <div className="container">
                    <div className={styles.layout}>
                        <MessageSidebar />
                        <MessageLayout />
                    </div>
                </div>
            </div>
        </ChatProvider>
    )
}
