import Search from '../components/Search/Search'
import Filters from '../components/Filters/Filters'
import Providers from '../components/Providers/Providers'
import { useGetUsers } from '../../serviceProviders/hooks/useServiceProviders';
import ReactLoading from 'react-loading';
import { useForm } from 'react-hook-form';
import styles from './SearchProvidersLayout.module.scss'

export default function SearchProvidersLayout() {
    const { control } = useForm({
        defaultValues: {
            search: '',
            location: '',
            availability: '',
            category: '',
        },
    })
    const { data: providers, isLoading: isLoadingProviders } = useGetUsers({ type: 'serviceProvider' });

    if (isLoadingProviders) return <ReactLoading type={'spin'} color={'green'} height={'5rem'} width={'5rem'} className='loading_spinner' />

    return (
        <div className={styles.layout}>
            <div className="container">
                <div className={styles.searchProvidersLayout}>
                    <Search />
                    <div className={styles.section}>
                        <Filters control={control} />
                        <Providers providers={providers.users} />
                    </div>
                </div>
            </div>
        </div>
    )
}
