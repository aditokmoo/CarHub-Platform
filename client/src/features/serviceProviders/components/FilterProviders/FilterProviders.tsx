import { FilterProviderProps } from '../../types';
import { useHandleSlider } from '../../hooks/useServiceProviders';
import DesktopFilter from './components/DesktopFilter/DesktopFilter';
import styles from './FilterProviders.module.scss'

export default function FilterProviders({ selectedGroups, setSelectedGroups }: FilterProviderProps) {
    const { isScrolled } = useHandleSlider();

    return (
        <section className={isScrolled ? `${styles.section} ${styles.scrolled}` : styles.section}>
            <div className="container">
                <DesktopFilter selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups} />
            </div>
        </section>
    );
}