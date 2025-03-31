import { FilterProviderProps } from '../../types';
import { useHandleSlider } from '../../hooks/useServiceProviders';
import DesktopFilter from './components/DesktopFilter/DesktopFilter';
import styles from './FilterProviders.module.scss'

export default function FilterProviders({ selectedCategory, setSelectedCategory }: FilterProviderProps) {
    const { isScrolled } = useHandleSlider();

    return (
        <section className={isScrolled ? `${styles.section} ${styles.scrolled}` : styles.section}>
            <div className="container">
                <DesktopFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
        </section>
    );
}