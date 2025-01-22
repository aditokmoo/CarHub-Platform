import React, { useState } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { handleSlide, toggleFilter } from '../../../../utils';
import { ServiceTypes } from '../../../../../../lib/ServiceTypes';
import { CgOptions } from 'react-icons/cg';
import { IoCarSportOutline } from 'react-icons/io5';
import Switch from '../../../../../../components/Switch/Switch';
import { FilterProviderProps } from '../../../../types';
import styles from './DesktopFilter.module.scss'

export default function DesktopFilter({ selectedGroups, setSelectedGroups }: FilterProviderProps) {
    const [categorySlide, setCategorySlide] = useState<number>(20);
    const [isToggled, setIsToggled] = useState<boolean>(false);

    return (
        <div className={styles.filterProvider}>
            <div className={styles.filterProviderLayout}>
                <div className={styles.desktopFilter}>
                    <div className={styles.filterSlider}>
                        <LuChevronLeft className={styles.arrow} onClick={() => setCategorySlide((prev) => handleSlide('left', prev))} style={categorySlide < -120 ? { display: 'block' } : { display: 'none' }} />
                        <div className={styles.categoryLayout}>
                            <div className={styles.categories} style={{ transform: `translateX(${categorySlide}px)` }}>
                                {ServiceTypes.map((filter: { name: string; color: string, icon: React.ReactNode }) => (
                                    <button
                                        onClick={() => setSelectedGroups((prev) => toggleFilter(filter.name, prev))}
                                        onKeyDown={(e) => e.key === 'Enter' && setSelectedGroups((prev) => toggleFilter(filter.name, prev))}
                                        className={`${styles.item} ${selectedGroups?.includes(filter.name) ? styles.active : ''}`}
                                        key={filter.name}
                                    >
                                        {filter.icon}
                                        {filter.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <LuChevronRight className={styles.arrow} onClick={() => setCategorySlide((prev) => handleSlide('right', prev))} style={categorySlide < 15 ? { display: 'none' } : { display: 'block' }} />
                    </div>
                </div>


                <div className={styles.filters}>
                    <button className={styles.btn}><CgOptions />Filters</button>
                    <Switch label='Filter by car details' isToggled={isToggled} setIsToggled={setIsToggled} />
                    <button className={isToggled ? `${styles.btn} ${styles.toggled}` : styles.btn}><IoCarSportOutline /> My Car</button>
                </div>
            </div>
        </div>
    )
}
