import Search from '../components/Search/Search'
import Filters from '../components/Filters/Filters'
import Providers from '../components/Providers/Providers'
import { useGetUsers } from '../../serviceProviders/hooks/useServiceProviders';
import { useFilters } from '../../../hooks/useFilter';
import styles from './SearchProvidersLayout.module.scss'
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function SearchProvidersLayout() {
    const { filters, setFilter, removeFilter } = useFilters();
    const { data: providers, status, fetchNextPage } = useGetUsers({ type: 'serviceProvider', search: filters?.search, ...filters });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    return (
        <div className={styles.layout}>
            <div className="container">
                <div className={styles.searchProvidersLayout}>
                    <Search
                        searchValue={filters.search || ''}
                        setFilter={setFilter}
                        removeFilter={removeFilter}
                    />
                    <div className={styles.section}>
                        <Filters
                            filters={filters}
                            setFilter={setFilter}
                            removeFilter={removeFilter}
                        />
                        <Providers
                            data={providers}
                            status={status}
                        />
                    </div>
                    <div ref={ref}></div>
                </div>
            </div>
        </div>
    )
}
