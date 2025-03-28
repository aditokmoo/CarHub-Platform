import { useParams } from 'react-router';
import { MdOutlineShare } from 'react-icons/md';
import { IoMdHeartEmpty, IoMdStar } from 'react-icons/io';
import { IoMailOutline } from 'react-icons/io5';
import Overview from './components/Overview/Overview';
import Location from './components/Location/Location';
import Reviews from './components/Reviews/Reviews';
import Gallery from './components/Gallery/Gallery';
import noProfileImage from '../../assets/no-user-image.png';
import useThrottle from '../../hooks/useThrottle';
import { useCreateConversation } from '../chat/hooks/useChat';
import { useHandleScroll, usetGetUserDetails } from './hooks/useServiceProviderDetails';
import { useAuthContext } from '../auth/context/auth.context';
import ReactLoading from 'react-loading';
import styles from './ServiceProviderDetails.module.scss';

export default function ServiceProviderDetails() {
    const { id } = useParams();
    const { state } = useAuthContext();
    const { data: user, isLoading: isUserLoading } = usetGetUserDetails(id!);
    const { activeSection } = useHandleScroll();
    const { mutate: createConversation, isPending: isCreatingConversation } = useCreateConversation();
    const throttledActiveSection = useThrottle(activeSection, 200);

    if (isUserLoading) return <ReactLoading type={'spin'} color={'green'} height={'5rem'} width={'5rem'} className='loading_spinner' />;

    const isCurrentUser: boolean = user._id === state.userId;

    return (
        <div className="container">
            <div className={styles.serviceProviderDetailsLayout}>
                <div className={styles.header}>
                    <div className={styles.leftCol}>
                        <h2 className={styles.title}>{user.name}</h2>
                        <div className={styles.rating}>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <IoMdStar key={rating} />
                            ))}
                            <span>4.9 - 85 reviews</span>
                        </div>
                    </div>
                    <div className={styles.rightCol}>
                        <span className={styles.share}><MdOutlineShare /> Share</span>
                        <span className={styles.save}><IoMdHeartEmpty /> Save</span>
                    </div>
                </div>

                <Gallery work={user.serviceProviderDetails.work} />

                <div className={styles.body}>
                    <div className={styles.bodyLayout}>
                        <ul className={styles.navList}>
                            <li><a href="#overview" className={throttledActiveSection === 'overview' ? styles.active : ''}>Overview</a></li>
                            <li><a href="#location" className={throttledActiveSection === 'location' ? styles.active : ''}>Location</a></li>
                            <li><a href="#reviews" className={throttledActiveSection === 'reviews' ? styles.active : ''}>Reviews <span>({user.serviceProviderDetails.rating.count})</span></a></li>
                        </ul>

                        <section id="overview">
                            <Overview
                                name={user.name}
                                profession={user.serviceProviderDetails.group[0]}
                                description={user.serviceProviderDetails.description}
                                experience={user.serviceProviderDetails.experience}
                                member={user.serviceProviderDetails.membership}
                                specialist={user.serviceProviderDetails.group}
                                serviceBays={user.serviceProviderDetails.numberOfServiceBays}
                                workers={user.serviceProviderDetails.numberOfWorkers}
                            />
                        </section>

                        <section id="location">
                            <Location location={user.location} />
                        </section>

                        <section id="reviews">
                            <Reviews />
                        </section>
                    </div>

                    <div className={styles.providerDetails}>
                        <div className={styles.details}>
                            {user.profileImage ? <img src={user.profileImage} alt="" /> : <img src={noProfileImage} alt="" />}
                            <div className={styles.userInfo}>
                                <h4>{user.name}</h4>
                                <span>{user.location}</span>
                            </div>
                        </div>
                        {isCurrentUser ? (
                            <button>Edit profile</button>
                        ) : (
                            isCreatingConversation ? <button disabled>< IoMailOutline /> Send message</button> : <button onClick={() => createConversation(user._id)}><IoMailOutline />Send message</button>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}