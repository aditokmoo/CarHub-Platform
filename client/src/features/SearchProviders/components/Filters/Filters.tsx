import { FaChevronDown } from "react-icons/fa";
import { filterList } from "../../utils/constants";
import useToggle from "../../../../hooks/useToggle";
import styles from "./Filters.module.scss";

interface PropTypes {
    filters: any,
    setFilter: any,
    removeFilter: any,
}

const filterNameMap: Record<number, "search" | "category" | "location" | "availability"> = {
    1: "search",
    2: "category",
    3: "location",
    4: "availability",
};

export default function Filters({ filters, setFilter, removeFilter }: PropTypes) {
    const { toggle, isActive } = useToggle();

    return (
        <div className={styles.filters}>
            <div className={styles.stickyContainer}>
                {filterList.map((filter) => (
                    <div className={styles.filter} key={filter.id}>
                        <h3 className={styles.filterTitle} onClick={() => toggle(filter.title)}>
                            {filter.title} <FaChevronDown className={isActive[filter.title] ? styles.active : ''} />
                        </h3>
                        <div className={`${styles.filterOptions} ${isActive[filter.title] ? styles.active : ''}`}>
                            {filter.options.map((option) => (
                                <label htmlFor={`${filter.id}-${option.id}`} className={styles.filterOption} key={option.id}>
                                    <input
                                        type="checkbox"
                                        id={`${filter.id}-${option.id}`}
                                        value={option.id}
                                        className={styles.checkbox}
                                        checked={filters[filterNameMap[filter.id]] === option.id}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            const filterKey = filterNameMap[filter.id];
                                            const value = e.target.value;

                                            if (isChecked) {
                                                setFilter(filterKey, value);
                                            } else {
                                                removeFilter(filterKey);
                                            }
                                        }}
                                    />
                                    <span className={styles.customCheckbox}></span>
                                    <span>{option.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
