import { IoSearchOutline } from 'react-icons/io5';
import styles from './SearchChat.module.scss';

export default function SearchChat() {
    return (
        <div className={styles.searchChat}>
            <IoSearchOutline />
            <input type="text" placeholder='Search messages' />
        </div>
    )
}
