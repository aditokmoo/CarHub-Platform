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

export default function SingleServiceProvider() {
    const { id } = useParams();
    const { data: user, isLoading: isUserLoading } = useGetSingleUser(id!);
    const { isActive, toggle } = useToggle();

    if (isUserLoading) return <h2>Loading...</h2>

    return (
        <div className="container">
            <div className={styles.singleServiceProviderLayout}>
                <div className={styles.header}>
                    <div className={styles.leftCol}>
                        <h2 className={styles.title}>{user.name}</h2>
                        <div className={styles.rating}>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <IoMdStar />
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
                            <li><a href="#overview" className={styles.active}>Overview</a></li>
                            <li><a href="#overview">Location</a></li>
                            <li><a href="#overview">Reviews <span>(85)</span></a></li>
                        </ul>

                        <Overview name={user.name} profession={user.group[0]} />
                        <Location location={user.location} />
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