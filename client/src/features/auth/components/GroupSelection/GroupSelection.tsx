import { Controller } from "react-hook-form";
import { FaCircleCheck } from "react-icons/fa6";
import { GroupSelectionProps } from "../../types";
import { serviceTypes } from "../../lib";
import styles from './GroupSelection.module.scss';

export default function GroupSelection({ control }: GroupSelectionProps) {
    return (
        <div className={styles.groupSelectionLayout}>
            <h4 className={styles.title}>Select types of service you do</h4>
            <ul className={styles.list}>
                {serviceTypes.map((type) => (
                    <li key={type}>
                        <Controller
                            control={control}
                            name="group"
                            rules={{ required: 'Please select a role' }}
                            render={({ field }) => (
                                <label>
                                    <input
                                        type="checkbox"
                                        value={type}
                                        checked={field.value.includes(type)}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const newGroup = field.value.includes(value)
                                                ? field.value.filter((item: string) => item !== value)
                                                : [...field.value, value];
                                            field.onChange(newGroup);
                                        }}
                                    />
                                    {field.value.includes(type) && (
                                        <span className={styles.checkboxIndicator}><FaCircleCheck /></span>
                                    )}
                                    {type}
                                </label>
                            )}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
