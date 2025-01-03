import MessageLayout from './components/MessageLayout/MessageLayout'
import MessageSidebar from './components/MessageSidebar/MessageSidebar'
import styles from './ChatLayout.module.scss'

export default function ChatLayout() {
    return (
        <div className={styles.chatLayout}>
            <div className="container">
                <div className={styles.layout}>
                    <MessageSidebar />
                    <MessageLayout />
                </div>
            </div>
        </div>
    )
}
