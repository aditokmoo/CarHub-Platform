import { CgOptions } from 'react-icons/cg';
import Switch from '../../../../../../components/Switch/Switch';
import styles from './Filters.module.scss';
import { IoCarSportOutline } from 'react-icons/io5';

interface PropTypes {
    toggle: (key: string) => void;
    isActive: Record<string, boolean>;
}

export default function Filters({ toggle, isActive }: PropTypes) {
    return (
        <div className={styles.filters}>
            <button className={styles.btn} onClick={() => toggle('filterModal')}><CgOptions />Filters</button>
            <Switch label='Filter by car details' isToggled={isActive['filterByCarDetails']} setIsToggled={toggle} />
            <button className={isActive['filterByCarDetails'] ? `${styles.btn} ${styles.toggled}` : styles.btn} onClick={() => toggle('myCarFilterModal')}><IoCarSportOutline /> My Car</button>
        </div>
    )
}
