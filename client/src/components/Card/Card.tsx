import { MdLocationOn } from 'react-icons/md';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { User } from '../../types';
import { IoMdStar } from 'react-icons/io';
import styles from './Card.module.scss';

interface PropTypes {
    toggleArchive: (user: User) => void,
    archive: User[],
    user: User
}

export default function Card({ toggleArchive, archive, user }: PropTypes) {
    return (
        <div className={styles.card} key={user.email}>
            {!archive.some(({ name }: { name: string }) => name === user.name) ? (
                <div className={styles.save} onClick={() => toggleArchive(user)}>
                    <FaRegHeart />
                </div>
            ) : (
                <div className={styles.save} onClick={() => toggleArchive(user)}>
                    <FaHeart />
                </div>
            )}
            <div className={styles.slider}>
                {user.serviceProviderDetails.workImages.map(({ images, title }) => (
                    <img
                        key={title}
                        src={`http://localhost:8000/uploads/${images[0]}`}
                        alt={user.name}
                        className={styles.workImage}
                    />
                ))}
            </div>

            <div className={styles.info}>
                <div className={styles.details}>
                    <Link to={`/serviceProvider/${user.name}`} className={styles.name}>{user.name}</Link>
                    <span className={styles.location}><MdLocationOn className={styles.locationIcon} />{user.location}</span>
                </div>
                <div className={styles.rating}>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <IoMdStar
                            key={rating}
                            className={styles.rating}
                            style={{
                                color: rating <= +user.serviceProviderDetails.rating.average ? '#FFC001' : 'gray',
                            }}
                        />
                    ))}
                    <span>{user.serviceProviderDetails.rating.average} - {user.serviceProviderDetails.rating.count} reviews</span>
                </div>
            </div>
        </div>
    )
}
