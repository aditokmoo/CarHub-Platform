import { FaChevronDown } from "react-icons/fa";
import { filterList } from "../../utils/constants";
import { Control, Controller } from "react-hook-form";
import styles from "./Filters.module.scss";

interface PropTypes {
    control: Control<{ search: string; category: string; location: string; availability: string }, any>;
}

const filterNameMap: Record<number, "search" | "category" | "location" | "availability"> = {
    1: "search",
    2: "category",
    3: "location",
    4: "availability",
};

export default function Filters({ control }: PropTypes) {
    return (
        <div className={styles.filters}>
            {filterList.map((filter) => (
                <div className={styles.filter} key={filter.id}>
                    <h3 className={styles.filterTitle}>
                        {filter.title} <FaChevronDown />
                    </h3>
                    {filter.options.map((option) => (
                        <label htmlFor={`${filter.id}-${option.id}`} className={styles.filterOption} key={option.id}>
                            <Controller
                                name={filterNameMap[filter.id]}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="radio"
                                        id={`${filter.id}-${option.id}`}
                                        value={option.id}
                                        className={styles.checkbox}
                                        checked={field.value === option.id}
                                        onChange={() => field.onChange(option.id)}
                                    />
                                )}
                            />
                            <span className={styles.customCheckbox}></span>
                            <span>{option.title}</span>
                        </label>
                    ))}
                </div>
            ))}
        </div>
    );
}
