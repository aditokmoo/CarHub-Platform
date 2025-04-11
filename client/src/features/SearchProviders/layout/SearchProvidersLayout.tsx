import Search from '../components/Search/Search'
import Filters from '../components/Filters/Filters'
import Providers from '../components/Providers/Providers'
import { useGetUsers } from '../../serviceProviders/hooks/useServiceProviders';
import { useFilters } from '../../../hooks/useFilter';
import styles from './SearchProvidersLayout.module.scss'

export default function SearchProvidersLayout() {
    const { filters, setFilter, removeFilter } = useFilters();
    const { data: providers, isLoading: isLoadingProviders } = useGetUsers({ type: 'serviceProvider', search: filters?.search, ...filters });

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
                            isLoadingProviders={isLoadingProviders}
                            providers={providers?.users}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
