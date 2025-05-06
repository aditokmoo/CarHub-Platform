import { Link } from 'react-router-dom'
import { FaCircleCheck } from 'react-icons/fa6';
import NoUserImage from '../../../../assets/no-user-image.png';
import styles from './Providers.module.scss'
import { UserResponse } from '../../../auth/types';
import { InfiniteData } from '@tanstack/react-query';

interface PropTypes {
    data?: InfiniteData<Page, unknown>,
    status: string,
}

interface Page {
    users: UserResponse[],
    currentPage: number,
    hasMore: boolean,
}

export default function Providers({ data, status }: PropTypes) {
    if (status === 'pending') return <div>Loading...</div>;
    if (status === 'error') return <div>Error</div>;

    return (
        <div className={styles.providers}>
            {data?.pages?.map((page: Page, index: number) => (
                <div key={`page-${page.currentPage}-${index}`}>
                    {page?.users?.map((provider) => (
                        <Link to={`/serviceProvider/${provider.name}`} className={styles.provider} key={provider._id}>
                            <div className={styles.cardHeader}>
                                <div className={styles.image}>
                                    <span className={styles.onlineStatus}>
                                        <span className={styles.status}></span>
                                    </span>
                                    <img src={provider.profileImage ? provider.profileImage : NoUserImage} alt={`${provider.name} profile image`} />
                                </div>
                                <div className={styles.details}>
                                    <span>vl. John Doe</span>
                                    <span className={styles.name}>{provider.name} {provider.confirmed && <span className={styles.verified}><FaCircleCheck /></span>}</span>
                                    <span>{provider.location}</span>
                                </div>
                            </div>
                            <div className={styles.achievments}></div>
                            <div className={styles.categories}>
                                {provider.serviceProviderDetails.group.map((category) => (
                                    <span key={category} className={styles.category}>{category}</span>
                                ))}
                            </div>
                            <div className={styles.desc}>
                                <p>{`provider.serviceProviderDetails.description.length > 275 ? ${provider.serviceProviderDetails.description.slice(0, 275)}... : provider.serviceProviderDetails.description`}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
}
