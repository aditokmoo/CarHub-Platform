import styles from './FilterChat.module.scss';

export default function FilterChat() {
    return (
        <div className={styles.filterChat}>
            <button className={styles.active}>Inbox</button>
            <button>Unread</button>
        </div>
    )
}
