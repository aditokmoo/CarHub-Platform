import { FilterProviderProps } from '../../types';
import { useHandleSlider } from '../../hooks/useServiceProviders';
import { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { handleSlide } from '../../utils';
import useToggle from '../../../../hooks/useToggle';
import Categories from './components/Categories/Categories';
import Filters from './components/Filters/Filters';
import ModalLayout from './components/Modal/ModalLayout';
import styles from './FilterProviders.module.scss'

export default function FilterProviders({ selectedCategory, setSelectedCategory }: FilterProviderProps) {
    const [categorySlide, setCategorySlide] = useState<number>(20);
    const { isScrolled } = useHandleSlider();
    const { toggle, isActive } = useToggle();

    return (
        <section className={isScrolled ? `${styles.section} ${styles.scrolled}` : styles.section}>
            <div className="container">
                <div className={styles.filterProvider}>
                    <div className={styles.filterProviderLayout}>
                        <div className={styles.desktopFilter}>
                            <div className={styles.filterSlider}>
                                <LuChevronLeft className={styles.arrow} onClick={() => setCategorySlide((prev) => handleSlide('left', prev))} style={categorySlide < -30 ? { display: 'block' } : { display: 'none' }} />
                                <div className={styles.categoryLayout}>
                                    <Categories
                                        categorySlide={categorySlide}
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                    />
                                </div>
                                <LuChevronRight className={styles.arrow} onClick={() => setCategorySlide((prev) => handleSlide('right', prev))} style={categorySlide < 15 ? { display: 'none' } : { display: 'block' }} />
                            </div>
                        </div>
                        <Filters toggle={toggle} isActive={isActive} />
                        <ModalLayout isActive={isActive} />
                    </div>
                </div>
            </div>
        </section>
    );
}