import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ServiceTypes } from '../../../../lib/ServiceTypes';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { IoCarSportOutline } from 'react-icons/io5';
import { CgOptions } from 'react-icons/cg';
import Switch from '../../../../components/Switch/Switch';
import styles from './FilterProviders.module.scss'

interface PropTypes {
    setSelectedGroups: Dispatch<SetStateAction<string[]>>
    selectedGroups: string[]
}

export default function FilterProviders({ setSelectedGroups, selectedGroups }: PropTypes) {
    const [ isScrolled, setIsScrolled ] = useState(false);
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {            
            if(window.scrollY > 80) {
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
                        <div className={styles.filters}>
                            <button className={styles.btn}><CgOptions />Filters</button>
                            <Switch label='Filter by car details' isToggled={isToggled} setIsToggled={setIsToggled} />
                            <button className={isToggled ? `${styles.btn} ${styles.toggled}` : styles.btn}><IoCarSportOutline /> My Car</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}