import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoMdStar } from 'react-icons/io';
import NoImage from '../../assets/no-image.jpg';
import { UserResponse } from '../../features/auth/types';
import styles from './Card.module.scss';

interface PropTypes {
    user: UserResponse
}

export default function Card({ user }: PropTypes) {
    return (
        <div className={styles.card} key={user.email}>
            <div className={styles.slider}>
                {user.serviceProviderDetails.work.length === 0 ? (
                    <img
                        src={NoImage}
                        alt="No work available"
                        className={styles.workImage}
                    />
                ) : (
                    user.serviceProviderDetails.work.map(({ images, workTitle }) => (
                        <img
                            key={workTitle}
                            src={images[0]}
                            alt={user.name}
                            className={styles.workImage}
                        />
                    ))
                )}
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
