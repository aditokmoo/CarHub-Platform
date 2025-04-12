import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/context/auth.context';
import { FaTimes, FaUserCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GrLanguage } from 'react-icons/gr';
import useToggle from '../../hooks/useToggle';
import { useCurrentUser, useLogout } from '../../features/auth/api/hooks/useAuth';
import ReactLoading from 'react-loading';
import NoProfileImage from '../../assets/no-user-image.png'
import styles from './Navbar.module.scss';

export default function Navbar() {
    const { state } = useAuthContext();
    const { isActive, toggle } = useToggle();
    const params = useParams()
    const { mutate: logout } = useLogout();
    const { data, isLoading: isLoadingUser } = useCurrentUser(state.currentUser);
    const navigate = useNavigate();

    if (isLoadingUser) return <ReactLoading type={'spin'} color={'green'} height={'5rem'} width={'5rem'} className='loading_spinner' />

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
                        <ul className={styles.desktopNav}>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/'>Car Shops <IoIosArrowDown /></Link></li>
                            <li><Link to='/'>Average Prices <IoIosArrowDown /></Link></li>
                            <li><Link to='/'>More <IoIosArrowDown /></Link></li>
                        </ul>
                        <button className={styles.mobileMenu}><RxHamburgerMenu /></button>
                        <ul className={styles.mobileNav}>
                            <button><FaTimes /></button>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/'>Car Shops <IoIosArrowDown /></Link></li>
                            <li><Link to='/'>Average Prices <IoIosArrowDown /></Link></li>
                            <li><Link to='/'>More <IoIosArrowDown /></Link></li>
                            <li><Link to='/forum'>Forum</Link></li>
                        </ul>
                    </div>

                    <div className={styles.rightSection}>
                        <ul className={styles.navList}>
                            <li><GrLanguage /></li>
                            <li onClick={() => toggle('navbarDropdownModal')} className={isActive.navbarDropdownModal ? styles.active : undefined}>
                                <RxHamburgerMenu />
                                {state.currentUser ? <img src={data?.user?.profileImage ? data?.user?.profileImage : NoProfileImage} alt="" className={styles.profileImage} /> : <FaUserCircle />}
                            </li>
                        </ul>

                        {state.currentUser ? (
                            <ul className={`${styles.dropdownList} ${styles.loggedList} ${isActive.navbarDropdownModal ? styles.active : ''}`}>
                                <li><Link to='/messages' onClick={() => toggle('navbarDropdownModal')}>Messages</Link></li>
                                <li><Link to='/notifications' onClick={() => toggle('navbarDropdownModal')}>Notifications</Link></li>
                                <li><Link to='/saved-providers' onClick={() => toggle('navbarDropdownModal')}>Saved Providers <span className={styles.notificationCount}>(0)</span></Link></li>
                                <li><Link to='/profile' onClick={() => toggle('navbarDropdownModal')}>Account</Link></li>
                                <li><Link to='/help-center'>Help Center</Link></li>
                                <li><Link to='/help-center'>Upgrade to Pro <span className={styles.proTag}>PRO</span></Link></li>
                                <li>
                                    <Link to='/' onClick={(e) => {
                                        e.preventDefault();
                                        logout();
                                        toggle('navbarDropdownModal');
                                        navigate('/')
                                    }}>Log out</Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className={`${styles.dropdownList} ${styles.loggedOutList} ${isActive.navbarDropdownModal ? styles.active : ''}`}>
                                <li><Link to='/auth/login'>Log In</Link></li>
                                <li><Link to='/auth/register'>Sign Up</Link></li>
                                <li><Link to='/'>Join as a Pro <span className={styles.proTag}>PRO</span></Link></li>
                                <li><Link to='/help-center'>Help Center</Link></li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
