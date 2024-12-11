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

export default function FilterProviders({ selectedGroups, setSelectedGroups }: PropTypes) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [categorySlide, setCategorySlide] = useState(20);
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 790) {
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

    const handleSlide = (direction: 'left' | 'right') => {
        setCategorySlide((prevSlide) => {
            const step = 150;
            const maxRightOffset = -130;

            if (direction === 'left') {
                return Math.min(prevSlide + step, 20);
            } else {
                return Math.max(prevSlide - step, maxRightOffset);
            }
        });
    };

    return (
        <section className={isScrolled ? `${styles.section} ${styles.scrolled}` : styles.section}>
            <div className="container">
                <div className={styles.filterProvider}>
                    <div className={styles.filterProviderLayout}>
                        <div className={styles.filterSlider}>
                            <LuChevronLeft className={styles.arrow} onClick={() => handleSlide('left')} style={categorySlide < -120 ? { display: 'block' } : { display: 'none' }} />
                            <div className={styles.categoryLayout}>
                                <div className={styles.categories} style={{ transform: `translateX(${categorySlide}px)` }}>
                                    {ServiceTypes.map((filter: { name: string; color: string, icon: React.ReactNode }) => (
                                        <button
                                            onClick={() => toggleFilter(filter.name)}
                                            onKeyDown={(e) => e.key === 'Enter' && toggleFilter(filter.name)}
                                            className={`${styles.item} ${selectedGroups?.includes(filter.name) ? styles.active : ''}`}
                                            key={filter.name}
                                        >
                                            {filter.icon}
                                            {filter.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <LuChevronRight className={styles.arrow} onClick={() => handleSlide('right')} style={categorySlide < 15 ? { display: 'none' } : { display: 'block' }} />
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