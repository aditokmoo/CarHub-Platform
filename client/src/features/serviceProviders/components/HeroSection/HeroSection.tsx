import { Link } from 'react-router-dom';
import SearchProviders from '../../../../components/Navbar/components/SearchProviders/SearchProviders';
import { Typewriter } from 'react-simple-typewriter';
import { IoMdStar } from 'react-icons/io';
import { HiWrenchScrewdriver } from 'react-icons/hi2';
import { PiUsersThreeFill } from 'react-icons/pi';
import OldManImage from '../../../../assets/hero-section-img-1.webp'
import YoungManImage from '../../../../assets/hero-section-img-2.webp'
import styles from './HeroSection.module.scss';

export default function HeroSection() {
    return (
        <header className={styles.hero}>
            <div className='container'>
                <div className={styles.heroSection}>
                    <div className={styles.col}>
                        <h1>Your partner in finding <br />
                            <Typewriter
                                words={['Mechanic', 'Electrician', 'Detailer', 'Body Specialist', 'AC Technician', 'Road Rescue', 'Tires']}
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
                        <div className={styles.msg}>
                            <div className={styles.dot}></div>
                            <div className={styles.dot}></div>
                            <div className={styles.dot}></div>
                            <div className={styles.thought}>We only provide the best service providers</div>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <img src={OldManImage} alt="" className={styles.heroSectionImage} />
                        <img src={YoungManImage} alt="" className={styles.heroSectionImage} />
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className="container">
                    <div className={styles.stats}>
                        <div className={styles.rating}>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <IoMdStar key={rating} />
                            ))}
                            <span>8.474</span> Reviews
                        </div>
                        <div className={styles.serviceProvider}>
                            <HiWrenchScrewdriver />
                            <span>8.474</span> Service Providers
                        </div>
                        <div className={styles.customers}>
                            <PiUsersThreeFill />
                            <span>8.474</span> Customers
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
