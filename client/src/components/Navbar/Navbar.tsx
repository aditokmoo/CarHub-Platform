import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/context/auth.context';
import { FaRegHeart, FaUserCircle } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io';
import styles from './Navbar.module.scss';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GrLanguage } from 'react-icons/gr';

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
                            <li><Link to='/'>Car Shops <IoIosArrowDown /></Link></li>
                            <li><Link to='/'>Average Prices <IoIosArrowDown /></Link></li>
                            <li><Link to='/'>More <IoIosArrowDown /></Link></li>
                        </ul>
                    </div>

                    <div className={styles.rightSection}>
                        {state.currentUser ? (
                            <ul className={styles.navList}>
                                <li><GrLanguage /></li>
                                <li>
                                    <RxHamburgerMenu />
                                    <FaUserCircle />
                                </li>
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
