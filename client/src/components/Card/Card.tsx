import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoMdStar } from 'react-icons/io';
import NoImage from '../../assets/no-image.jpg';
import { UserResponse } from '../../features/auth/types';
import styles from './Card.module.scss';
import { useState } from 'react';

interface PropTypes {
    user: UserResponse
}

export default function Card({ user }: PropTypes) {
    const [currentPost, setCurrentPost] = useState(0);

    console.log(user.serviceProviderDetails.work)

    console.log(currentPost)

    return (
        <div className={styles.card} key={user.email}>
            {user.serviceProviderDetails.work.length > 1 && (
                <div className={styles.arrows}>
                    <button className={styles.arrow} onClick={() => setCurrentPost(currentPost === 0 ? user.serviceProviderDetails.work.length - 1 : currentPost - 1)}><MdKeyboardArrowLeft /></button>
                    <button className={styles.arrow} onClick={() => setCurrentPost(currentPost === user.serviceProviderDetails.work.length - 1 ? 0 : currentPost + 1)}><MdKeyboardArrowRight /></button>
                </div>
            )}
            <div className={styles.slider}>
                {user.serviceProviderDetails.work.length === 0 ? (
                    <img
                        src={NoImage}
                        alt="No work available"
                        className={styles.workImage}
                    />
                ) : (
                    <img
                        key={user.serviceProviderDetails.work[currentPost].workTitle}
                        src={user.serviceProviderDetails.work[currentPost].images[0]}
                        alt={user.name}
                        className={styles.workImage}
                    />
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
