import { useState } from 'react';
import { useGetUsers } from './api/hooks/useServiceProviders';
import FilterProviders from './components/FilterProviders/FilterProviders';
import Providers from './components/Providers/Providers';
import styles from './ServiceProviders.module.scss';
import HeroSection from './components/HeroSection/HeroSection';

export default function ServiceProviders() {
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const { data: users } = useGetUsers({ type: 'serviceProvider', groups: selectedGroups });

    return (
        <div className={styles.layout}>
            <HeroSection />
            <FilterProviders setSelectedGroups={setSelectedGroups} selectedGroups={selectedGroups} />
            <Providers data={users} />
        </div>
    );
}
