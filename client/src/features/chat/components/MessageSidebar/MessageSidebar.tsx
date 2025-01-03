import ChatList from './components/ChatList/ChatList';
import FilterChat from './components/FilterChat/FilterChat';
import SearchChat from './components/SearchChat/SearchChat';
import styles from './MessageSidebar.module.scss';

export default function MessageSidebar() {
    return (
        <div className={styles.sidebar}>
            <SearchChat />
            <FilterChat />
            <ChatList />
        </div>
    )
}
