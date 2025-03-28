import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/context/auth.context';
import { customerLinks, serviceProviderLinks } from '../../lib/SidebarLinks';
import { useLogout } from '../../features/auth/api/hooks/useAuth';
import ReactLoading from 'react-loading';
import styles from './SideBar.module.scss';

export default function SideBar() {
    const { state } = useAuthContext();
    const { mutate: logout, isPending: isLoggingOut } = useLogout();
    const location = useLocation();
    const pathname = location.pathname;

    if (isLoggingOut) return <ReactLoading type={'spin'} color={'green'} height={'5rem'} width={'5rem'} className='loading_spinner' />;

    return (
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Car<span>Hub</span></h3>
            {state.userRole === 'customer' && (
                <ul className={styles.linkList}>
                    {customerLinks.map((link: { name: string, url: string, icon: React.ReactNode }) => (
                        <li key={link.name}>
                            <Link to={link.url} className={pathname === link.url ? styles.active : ''} onClick={() => link.name === 'Logout' ? logout() : null}>
                                <span className={styles.icon}>{link.icon}</span>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {state.userRole === 'serviceProvider' && (
                <ul className={styles.linkList}>
                    {serviceProviderLinks.map((link: { name: string, url: string, icon: React.ReactNode }) => (
                        <li key={link.name}>
                            <Link to={link.url} className={pathname === link.url ? styles.active : ''} onClick={() => link.name === 'Logout' ? logout() : null}>
                                <span className={styles.icon}>{link.icon}</span>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
