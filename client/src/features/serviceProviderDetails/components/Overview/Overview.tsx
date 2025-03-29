import { MdEdit } from 'react-icons/md'
import styles from './Overview.module.scss'

interface PropTypes {
    isCurrentUser: boolean,
    experience: number,
    member: number,
    specialist: string[],
    serviceBays: number,
    workers: number,
}

export default function Overview({ isCurrentUser, experience, member, specialist, serviceBays, workers }: Readonly<PropTypes>) {
    return (
        <div className={styles.overview}>
            {isCurrentUser && <span className={styles.editOption}><MdEdit /></span>}
            <ul className={styles.badgeList}>
                <li>{experience} {experience > 1 ? 'Years' : 'Year'} Experience</li>
                <li>{member} {member > 1 ? 'Years' : 'Year'} Member</li>
                <li>{specialist} Specialist</li>
                <li>{serviceBays} Service Bay</li>
                <li>{workers} Workers</li>
            </ul>
        </div>
    )
}
