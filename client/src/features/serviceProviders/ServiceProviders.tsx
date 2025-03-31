import { useState } from 'react';
import FilterProviders from './components/FilterProviders/FilterProviders';
import Providers from './components/Providers/Providers';
import HeroSection from './components/HeroSection/HeroSection';
import styles from './ServiceProviders.module.scss';
import { useGetUsers } from './hooks/useServiceProviders';

export default function ServiceProviders() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const { data: users } = useGetUsers({ type: 'serviceProvider', category: selectedCategory });

    return (
        <div className={styles.layout}>
            <HeroSection />
            <FilterProviders setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
            <Providers data={users} />
        </div>
    );
}
