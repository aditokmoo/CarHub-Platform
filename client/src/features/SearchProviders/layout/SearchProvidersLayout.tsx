import { useSearchParams } from 'react-router-dom';
import Search from '../components/Search/Search'
import Filters from '../components/Filters/Filters'
import Providers from '../components/Providers/Providers'
import { useGetUsers } from '../../serviceProviders/hooks/useServiceProviders';
import { useForm } from 'react-hook-form';
import styles from './SearchProvidersLayout.module.scss'

export default function SearchProvidersLayout() {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            search: '',
            location: '',
            availability: '',
            category: '',
        },
    })
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const { data: providers, isLoading: isLoadingProviders } = useGetUsers({ type: 'serviceProvider', search: searchQuery });

    return (
        <div className={styles.layout}>
            <div className="container">
                <div className={styles.searchProvidersLayout}>
                    <Search
                        searchValue={searchQuery}
                        setSearchParams={setSearchParams}
                        control={control}
                        handleSubmit={handleSubmit}
                    />
                    <div className={styles.section}>
                        <Filters control={control} />
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
