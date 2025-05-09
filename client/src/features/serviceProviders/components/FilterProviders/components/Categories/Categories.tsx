import { Link, useSearchParams } from 'react-router-dom';
import { ServiceTypes } from '../../../../../../lib/constants/ServiceTypes';
import styles from './Categories.module.scss'

interface PropTypes {
    categorySlide: number;
}

export default function Categories({ categorySlide }: PropTypes) {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category') || '';

    return (
        <div className={styles.categories} style={{ transform: `translateX(${categorySlide}px)` }}>
            {ServiceTypes.map((filter: { name: string; color: string, icon: React.ReactNode }) => (
                <Link
                    to={`?category=${filter.name}`}
                    onClick={() => {
                        setSearchParams({ category: filter.name });
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && setSearchParams({ category: filter.name })}
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
