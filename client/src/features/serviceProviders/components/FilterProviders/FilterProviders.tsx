import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import { ServiceTypes } from '../../../../lib/ServiceTypes';
import styles from './FilterProviders.module.scss'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface PropTypes {
    setSelectedGroups: Dispatch<SetStateAction<string[]>>
    selectedGroups: string[]
}

export default function FilterProviders({ setSelectedGroups, selectedGroups }: PropTypes) {
    const [ isScrolled, setIsScrolled ] = useState(false);
    useEffect(() => {
        const handleScroll = () => {            
            if(window.scrollY > 150) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleFilter = (filterName: string) => {
        setSelectedGroups((prevFilters: string[]) =>
            prevFilters.includes(filterName)
                ? prevFilters.filter((name: string) => name !== filterName)
                : [...prevFilters, filterName]
        );
    };

    return (
        <section className={isScrolled ? `${styles.section} ${styles.scrolled}` : styles.section}>
            <div className="container">
                <div className={styles.filterProvider}>
                    <div className={styles.filterProviderLayout}>
                        <div className={styles.categories}>
                            <LuChevronLeft className={styles.arrow} />
                            {ServiceTypes.map((filter: { name: string; color: string, icon: React.ReactNode }) => (
                                <div
                                    onClick={() => toggleFilter(filter.name)}
                                    onKeyDown={(e) => e.key === 'Enter' && toggleFilter(filter.name)}
                                    className={`${styles.item} ${selectedGroups?.includes(filter.name) ? styles.active : ''}`}
                                    role="button"
                                    tabIndex={0}
                                    key={filter.name}
                                >
                                    {filter.icon}
                                    {filter.name}
                                </div>
                            ))}
                            <LuChevronRight className={styles.arrow} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}