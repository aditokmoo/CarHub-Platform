import { Link } from 'react-router-dom';
import { ServiceTypes } from '../../../../../../lib/ServiceTypes';
import { toggleFilter } from '../../../../utils';
import styles from './Categories.module.scss'

interface PropTypes {
    categorySlide: number;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function Categories({ categorySlide, selectedCategory, setSelectedCategory }: PropTypes) {
    return (
        <div className={styles.categories} style={{ transform: `translateX(${categorySlide}px)` }}>
            {ServiceTypes.map((filter: { name: string; color: string, icon: React.ReactNode }) => (
                <Link
                    to={`?category=${filter.name}`}
                    onClick={() => {
                        setSelectedCategory(filter.name)
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedCategory((prev) => toggleFilter(filter.name, prev))}
                    className={`${styles.item} ${selectedCategory === filter.name ? styles.active : ''}`}
                    key={filter.name}
                >
                    {filter.icon}
                    {filter.name}
                </Link>
            ))}
        </div>
    )
}
