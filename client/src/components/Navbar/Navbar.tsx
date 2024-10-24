import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/context/auth.context';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoMdNotificationsOutline } from 'react-icons/io';
import styles from './Navbar.module.scss';

export default function Navbar() {
    const { state } = useAuthContext();
    const params = useParams()

    console.log(params)

    return (
        <nav className={styles.nav} style={
            Object.keys(params).length === 0
                ? { position: 'sticky' }
                : { position: 'relative' }
        }>
            <div className="container">
                <div className={styles.navSection}>
                    <div className={styles.leftSection}>
                        <h3 className={styles.title}>Car<span>Hub</span></h3>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/'>Shops</Link></li>
                            <li><Link to='/'>About Us</Link></li>
                        </ul>
                    </div>

                    <div className={styles.rightSection}>
                        {state.currentUser ? (
                            <ul className={styles.navList}>
                                <li><Link to='/profile'>Upgrade to a Pro</Link></li>
                                <li><Link to='/saved-providers'><FaRegHeart /></Link></li>
                                <li><Link to='/notifications'><IoMdNotificationsOutline /></Link></li>
                                <li><Link to='/profile'><FaRegCircleUser /></Link></li>
                            </ul>
                        ) : (
                            <ul className={styles.navList}>
                                <li><Link to='/'>Join as a Pro</Link></li>
                                <li><Link to='/auth/register'>Sign Up</Link></li>
                                <li><Link to='/auth/login'>Log In</Link></li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
