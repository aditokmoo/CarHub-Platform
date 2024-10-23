import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.advertisingSection}>
                <div className="container">
                    <div className={styles.layout}>
                        <div className={styles.advertise}>
                            <h4>Sign Up as PRO</h4>
                            <p>Sign up as a PRO User and unlock exclusive benefits just for you!</p>
                        </div>
                        <Link to='/auth/register'>Create account</Link>
                    </div>
                </div>
            </div>

            <div className={styles.footerLayout}>
                <div className="container">
                    <div className={styles.layout}>
                        <ul>
                            <h2>Car<span>Hub</span></h2>
                            <li>Copyright © 2024 — CarHub. Sva prava zadržana</li>
                        </ul>
                        <ul>
                            <h4>Information</h4>
                            <li>About Us</li>
                            <li>Privacy Policy</li>
                            <li>Marketing</li>
                        </ul>
                        <ul>
                            <h4>Links</h4>
                            <li>Link</li>
                            <li>Link</li>
                            <li>Link</li>
                            <li>Link</li>
                        </ul>
                        <ul>
                            <h4>Links</h4>
                            <li>Link</li>
                            <li>Link</li>
                            <li>Link</li>
                            <li>Link</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
