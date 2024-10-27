import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/context/auth.context';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GrLanguage } from 'react-icons/gr';
import useToggle from '../../hooks/useToggle';
import { useLogout } from '../../features/auth/api/hooks/useAuth';
import styles from './Navbar.module.scss';

export default function Navbar() {
    const { state } = useAuthContext();
    const { isActive, toggle } = useToggle();
    const params = useParams()
    const { mutate: logout } = useLogout();

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
                            <>
                                <ul className={styles.navList}>
                                    <li><GrLanguage /></li>
                                    <li onClick={toggle} className={isActive ? styles.active : undefined}>
                                        <RxHamburgerMenu />
                                        <FaUserCircle />
                                    </li>
                                </ul>

                                <ul className={`${styles.dropdownList} ${styles.loggedList} ${isActive ? styles.active : ''}`}>
                                    <li><Link to='/profile'>Messages</Link></li>
                                    <li><Link to='/notifications'>Notifications</Link></li>
                                    <li><Link to='/saved-providers'>Saved Providers <span className={styles.notificationCount}>(0)</span></Link></li>
                                    <li><Link to='/profile'>Account</Link></li>
                                    <li><Link to='/help-center'>Help Center</Link></li>
                                    <li><Link to='/help-center'>Upgrade to Pro <span className={styles.proTag}>PRO</span></Link></li>
                                    <li>
                                        <Link to='/' onClick={(e) => {
                                            e.preventDefault();
                                            logout();
                                        }}>Log out</Link>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <ul className={styles.navList}>
                                    <li><GrLanguage /></li>
                                    <li onClick={toggle}>
                                        <RxHamburgerMenu />
                                        <FaUserCircle />
                                    </li>
                                </ul>

                                <ul className={`${styles.dropdownList} ${styles.loggedOutList} ${isActive ? styles.active : ''}`}>
                                    <li><Link to='/auth/login'>Log In</Link></li>
                                    <li><Link to='/auth/register'>Sign Up</Link></li>
                                    <li><Link to='/'>Join as a Pro <span className={styles.proTag}>PRO</span></Link></li>
                                    <li><Link to='/help-center'>Help Center</Link></li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
