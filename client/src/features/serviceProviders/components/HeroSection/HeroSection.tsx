import { Link } from 'react-router-dom';
import styles from './HeroSection.module.scss';
import SearchProviders from '../../../../components/Navbar/components/SearchProviders/SearchProviders';
import { Typewriter } from 'react-simple-typewriter';

export default function HeroSection() {
    return (
        <header className={styles.hero}>
            <div className='container'>
                <div className={styles.heroSection}>
                    <div className={styles.col}>
                        <h1>Your partner in finding <br />
                            <Typewriter
                                words={['Mechanic', 'Electrician', 'Detailer', 'Body Specialist']}
                                loop={true}
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </h1>
                        <ul className={styles.heroNav}>
                            <li className={styles.active}>Hire A Pro</li>
                            <li><Link to='/auth/register'>Find customers</Link></li>
                        </ul>
                        <SearchProviders />
                        <p className={styles.tipMessage}>Try: <span>I need to fix my brakes</span> or <span>I want to chip my car to have more HP</span></p>
                    </div>
                    <div className={styles.col}>
                        Image
                    </div>
                </div>
            </div>
        </header>
    )
}
