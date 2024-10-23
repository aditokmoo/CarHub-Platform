import { useParams } from 'react-router';
import { useGetSingleUser } from './api/hooks/useSingleServiceProvider';
import { MdOutlineShare } from 'react-icons/md';
import CreateAppointment from '../appointments/components/CreateAppointment/CreateAppointment';
import useToggle from '../../hooks/useToggle';
import { IoMdHeartEmpty, IoMdStar } from 'react-icons/io';
import { IoMailOutline } from 'react-icons/io5';
import Slider from './components/Slider/Slider';
import styles from './SingleServiceProvider.module.scss';

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
                            <li><a href="#overview">Reviews</a></li>
                        </ul>

                        <div className={styles.overview}>
                            <ul className={styles.badgeList}>
                                <li>2 Years Experience</li>
                                <li>1 Year Member</li>
                                <li>Exhaust Specialist</li>
                                <li>1 Service Bay</li>
                                <li>4 Workers</li>
                            </ul>

                            <div className={styles.about}>
                                <h3>About {user.name}</h3>
                                <span>{user.group[0]}</span>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis beatae modi quos magni culpa enim ad ut soluta omnis provident voluptatum atque facere impedit obcaecati, minima voluptas pariatur, deserunt non. Repellat aperiam cum quia labore aliquam ipsa autem assumenda maiores. Facilis nemo voluptatibus veritatis harum blanditiis reiciendis labore repudiandae adipisci asperiores ipsam, illum voluptas nisi hic repellendus aspernatur nesciunt!</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.providerDetails}>
                        <button><IoMailOutline />Send message</button>
                        <button onClick={toggle}>Create appointment</button>
                    </div>
                </div>
            </div>
            {isActive && <CreateAppointment toggle={toggle} />}
        </div>
    )
}