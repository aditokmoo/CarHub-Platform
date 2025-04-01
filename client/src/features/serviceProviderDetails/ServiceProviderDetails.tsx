import { MdOutlineShare } from 'react-icons/md';
import { IoMdHeartEmpty, IoMdStar } from 'react-icons/io';
import Overview from './components/Overview/Overview';
import Location from './components/Location/Location';
import Reviews from './components/Reviews/Reviews';
import Gallery from './components/Gallery/Gallery';
import UserDetails from './components/UserDetails/UserDetails';
import useThrottle from '../../hooks/useThrottle';
import { useAuthContext } from '../auth/context/auth.context';
import { useHandleScroll, usetGetUserDetails } from './hooks/useServiceProviderDetails';
import ReactLoading from 'react-loading';
import styles from './ServiceProviderDetails.module.scss';
import About from './components/About/About';

export default function ServiceProviderDetails() {
    const { state } = useAuthContext();
    const { data: user, isLoading: isUserLoading } = usetGetUserDetails();
    const { activeSection } = useHandleScroll();
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

                <Gallery
                    isCurrentUser={isCurrentUser}
                    work={user.serviceProviderDetails.work}
                />

                <div className={styles.body}>
                    <div className={styles.bodyLayout}>
                        <ul className={styles.navList}>
                            <li><a href="#overview" className={throttledActiveSection === 'overview' ? styles.active : ''}>Overview</a></li>
                            <li><a href="#location" className={throttledActiveSection === 'location' ? styles.active : ''}>Location</a></li>
                            <li><a href="#reviews" className={throttledActiveSection === 'reviews' ? styles.active : ''}>Reviews <span>({user.serviceProviderDetails.rating.count})</span></a></li>
                        </ul>

                        <section id="overview">
                            <Overview
                                isCurrentUser={isCurrentUser}
                                experience={user.serviceProviderDetails.experience}
                                member={user.serviceProviderDetails.membership}
                                specialist={user.serviceProviderDetails.group}
                                serviceBays={user.serviceProviderDetails.numberOfServiceBays}
                                workers={user.serviceProviderDetails.numberOfWorkers}
                            />
                        </section>

                        <section id="about">
                            <About
                                isCurrentUser={isCurrentUser}
                                name={user.name}
                                profession={user.serviceProviderDetails.group[0]}
                                description={user.serviceProviderDetails.description}
                            />
                        </section>

                        <section id="location">
                            <Location
                                isCurrentUser={isCurrentUser}
                                location={user.location}
                            />
                        </section>

                        <section id="reviews">
                            <Reviews />
                        </section>
                    </div>

                    <UserDetails
                        user={user}
                        isCurrentUser={isCurrentUser}
                        currentUser={state.currentUser}
                    />
                </div>
            </div>
        </div >
    );
}