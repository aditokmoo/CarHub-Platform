import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import styles from './Search.module.scss'

interface PropTypes {
    searchValue: string,
    setFilter: any,
    removeFilter: any
}

export default function Search({ searchValue, setFilter, removeFilter }: PropTypes) {
    const [localSearch, setLocalSearch] = useState<string>(searchValue);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (localSearch !== '') removeFilter('search');
        setFilter('search', localSearch);
    }

    return (
        <form className={styles.search} onSubmit={handleSubmit}>
            <div className={styles.label}>
                <FaSearch className={styles.searchIcon} />
                <input
                    type='text'
                    placeholder='Search Your Specialist'
                    id='search'
                    value={localSearch}
                    onChange={(e) => {
                        setLocalSearch(e.target.value);
                    }}
                />
            </div>
        </form>
    )
}
