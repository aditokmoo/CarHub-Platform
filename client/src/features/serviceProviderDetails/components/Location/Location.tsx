import { MdEdit } from 'react-icons/md';
import styles from './Location.module.scss';

interface PropTypes {
    location: string,
    isCurrentUser: boolean,
}

export default function Location({ isCurrentUser, location }: PropTypes) {
    return (
        <div className={styles.location}>
            {isCurrentUser && <span className={styles.editOption}><MdEdit /></span>}
            <h3>Location</h3>
            <span>{location}</span>
            <iframe className={styles.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8100.958760521782!2d18.12008954433372!3d44.122117295926316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475f27c98115ca5b%3A0x43b313e688a56887!2sCristal%20Car%20DETAILING%20STUDIO!5e0!3m2!1sen!2sba!4v1729710145267!5m2!1sen!2sba" height="450" loading="lazy"></iframe>
        </div>
    )
}
