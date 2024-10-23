import { Control, Controller } from "react-hook-form";
import styles from './GroupSelection.module.scss';
import { FaCircleCheck } from "react-icons/fa6";

interface PropTypes {
    control: Control;
}

const serviceTypes = [
    'Mehanic',
    'Electrician',
    'Body specialist',
    'Tuning',
    'Exhaust',
    'Transmission',
    'Detailer',
];

export default function GroupSelection({ control }: PropTypes) {
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
