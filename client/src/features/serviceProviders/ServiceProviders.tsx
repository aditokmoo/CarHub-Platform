import { useEffect, useState } from 'react';
import FilterProviders from './components/FilterProviders/FilterProviders';
import Providers from './components/Providers/Providers';
import HeroSection from './components/HeroSection/HeroSection';
import { useGetUsers } from './hooks/useServiceProviders';
import { useFilters } from '../../hooks/useFilter';
import { useInView } from 'react-intersection-observer';
import styles from './ServiceProviders.module.scss';

export default function ServiceProviders() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const { filters } = useFilters();
    const { data: providers, status, fetchNextPage } = useGetUsers({ type: 'serviceProvider', search: filters?.search, ...filters });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    return (
        <div className={styles.layout}>
            <HeroSection />
            <FilterProviders
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory} />
            <Providers
                data={providers}
                status={status}
            />
            <div ref={ref}></div>
        </div>
    );
}
