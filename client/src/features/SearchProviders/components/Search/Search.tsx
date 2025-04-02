import { FaSearch } from 'react-icons/fa'
import styles from './Search.module.scss'

export default function Search() {
    return (
        <form className={styles.search}>
            <div className={styles.label}>
                <FaSearch className={styles.searchIcon} />
                <input type='text' placeholder='Search Your Specialist' id='search' />
            </div>
        </form>
    )
}
