import { useState } from 'react';
import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import styles from './Search.module.scss'

interface PropTypes {
    searchValue: string,
    setSearchParams: any,
    control: Control<{ search: string; location: string; availability: string; category: string; }>,
    handleSubmit: UseFormHandleSubmit<{ search: string; location: string; availability: string; category: string; }>
}

export default function Search({ searchValue, setSearchParams, control, handleSubmit }: PropTypes) {
    const [localSearch, setLocalSearch] = useState<string>(searchValue);

    return (
        <form className={styles.search} onSubmit={handleSubmit(() => setSearchParams({ search: localSearch }))}>
            <div className={styles.label}>
                <FaSearch className={styles.searchIcon} />
                <Controller
                    name='search'
                    defaultValue={searchValue}
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type='text'
                            placeholder='Search Your Specialist'
                            id='search'
                            value={localSearch}
                            onChange={(e) => {
                                field.onChange(e);
                                setLocalSearch(e.target.value);
                            }}
                        />
                    )}
                />
            </div>
        </form>
    )
}
