import { FaSearch } from 'react-icons/fa'
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form'
import { useNavigate } from 'react-router'
import styles from './SearchProviders.module.scss'

interface PropTypes {
    control: Control<{ search: string }>
    handleSubmit: UseFormHandleSubmit<{ search: string }>
}

export default function SearchProviders({ control, handleSubmit }: PropTypes) {
    const navigate = useNavigate();

    return (
        <form className={styles.form} onSubmit={handleSubmit((data) => navigate(`/serviceProviders?search=${encodeURIComponent(data.search)}`))}>
            <div className={styles.label}>
                <FaSearch className={styles.searchIcon} />
                <Controller
                    name='search'
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            id='search'
                            placeholder='Search Your Specialist'
                        />
                    )}
                />
                <button>Search</button>
            </div>
        </form>
    )
}