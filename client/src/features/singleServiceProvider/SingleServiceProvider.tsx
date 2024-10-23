import { useParams } from 'react-router';
import { useGetSingleUser } from './api/hooks/useSingleServiceProvider';
import { MdOutlineShare } from 'react-icons/md';
import CreateAppointment from '../appointments/components/CreateAppointment/CreateAppointment';
import useToggle from '../../hooks/useToggle';
import { IoMdHeartEmpty, IoMdStar } from 'react-icons/io';
import { IoMailOutline } from 'react-icons/io5';
import Slider from './components/Slider/Slider';
import styles from './SingleServiceProvider.module.scss';
import Overview from './components/Overview/Overview';
import Location from './components/Location/Location';
import { useEffect, useState } from 'react';
import Reviews from './components/Reviews/Reviews';

export default function SingleServiceProvider() {
    const { id } = useParams();
    const { data: user, isLoading: isUserLoading } = useGetSingleUser(id!);
    const { isActive, toggle } = useToggle();
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        const handleScroll = () => {
            const locationSection = document.getElementById('location');
            const reviewsSection = document.getElementById('reviews');
            
            const scrollY = window.scrollY;
            
            if (scrollY >= reviewsSection.offsetTop - 50) {
                setActiveSection('reviews');
            } else if (scrollY >= locationSection.offsetTop - 50) {
                setActiveSection('location');
            } else {
                setActiveSection('overview');
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isUserLoading) return <h2>Loading...</h2>

    return (
        <div className="container">
            <div className={styles.singleServiceProviderLayout}>
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
                
                <Slider images={user.workImages} />

                <div className={styles.body}>
                    <div className={styles.bodyLayout}>
                        <ul className={styles.navList}>
                            <li><a href="#overview" className={activeSection === 'overview' ? styles.active : ''}>Overview</a></li>
                            <li><a href="#location" className={activeSection === 'location' ? styles.active : ''}>Location</a></li>
                            <li><a href="#reviews" className={activeSection === 'reviews' ? styles.active : ''}>Reviews <span>(85)</span></a></li>
                        </ul>

                        <section id="overview">
                            <Overview name={user.name} profession={user.group[0]} />
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
                            <img src={`http://localhost:8000/uploads/${user.profileImage}`} alt="" />
                            <div className={styles.userInfo}>
                                <h4>{user.name}</h4>
                                <span>{user.location}</span>
                            </div>
                        </div>
                        <button><IoMailOutline />Send message</button>
                        <button onClick={toggle}>Create appointment</button>
                    </div>
                </div>
            </div>
            {isActive && <CreateAppointment toggle={toggle} />}
        </div>
    )
}