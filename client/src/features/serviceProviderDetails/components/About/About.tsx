import { MdEdit } from 'react-icons/md'
import styles from './About.module.scss'

interface PropTypes {
    isCurrentUser: boolean,
    name: string,
    profession: string,
    description: string,
}

export default function About({ isCurrentUser, name, profession, description }: PropTypes) {
    return (
        <div className={styles.about}>
            {isCurrentUser && <span className={styles.editOption}><MdEdit /></span>}
            <h3>About {name}</h3>
            <span>{profession}</span>
            <p>{description}</p>
        </div>
    )
}
