import styles from './MessageInput.module.scss'

export default function MessageInput() {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            console.log('Hello')
        }} className={styles.messageInput}>
            <input type="text" placeholder="Type your message here..." />
            <button>Send</button>
        </form>
    )
}
