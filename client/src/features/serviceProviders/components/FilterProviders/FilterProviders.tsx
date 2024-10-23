import { Dispatch, SetStateAction } from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './FilterProviders.module.scss'
import { ServiceTypes } from '../../../../lib/ServiceTypes';
import { IoOptionsOutline } from 'react-icons/io5';

interface PropTypes {
    setSelectedGroups: Dispatch<SetStateAction<string[]>>
    selectedGroups: string[]
}

export default function FilterProviders({ setSelectedGroups, selectedGroups }: PropTypes) {

    const toggleFilter = (filterName: string) => {
        setSelectedGroups((prevFilters: string[]) =>
            prevFilters.includes(filterName)
                ? prevFilters.filter((name: string) => name !== filterName)
                : [...prevFilters, filterName]
        );
    };

    return (
        <div className={styles.filterProvider}>
            <div className="container">
                <div className={styles.filterProviderLayout}>
                    <div className={styles.categories}>
                        {ServiceTypes.map((filter: { name: string; color: string, icon: React.ReactNode }) => (
                            <div
                                onClick={() => toggleFilter(filter.name)}
                                onKeyDown={(e) => e.key === 'Enter' && toggleFilter(filter.name)}
                                className={`${styles.item} ${selectedGroups?.includes(filter.name) ? styles.active : ''}`}
                                role="button"
                                tabIndex={0}
                                key={filter.name}
                            >
                                {selectedGroups.includes(filter.name) && <FaCheck className={styles.icon} />}
                                {filter.icon}
                                {filter.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}