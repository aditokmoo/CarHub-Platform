import { IoMdStar } from 'react-icons/io';
import styles from './Reviews.module.scss';

export default function Reviews() {
    return (
        <div className={styles.reviewLayout}>
            <h3>Reviews</h3>
            <div className={styles.stats}>
                <div className={styles.averageReview}>
                    <h3>4.8</h3>
                    <div className={styles.rating}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <IoMdStar key={rating} />
                        ))}
                    </div>
                    <span>85 reviews</span>
                </div>

                <div className={styles.reviewStats}>
                    <div className={styles.rateProgress}>
                        <span>5 stars</span>
                        <div className={styles.progressBar}>
                            <div className={styles.progress}></div>
                        </div>
                        <span>187</span>
                    </div>

                    <div className={styles.rateProgress}>
                        <span>4 stars</span>
                        <div className={styles.progressBar}>
                            <div className={styles.progress}></div>
                        </div>
                        <span>187</span>
                    </div>

                    <div className={styles.rateProgress}>
                        <span>3 stars</span>
                        <div className={styles.progressBar}>
                            <div className={styles.progress}></div>
                        </div>
                        <span>187</span>
                    </div>

                    <div className={styles.rateProgress}>
                        <span>2 stars</span>
                        <div className={styles.progressBar}>
                            <div className={styles.progress}></div>
                        </div>
                        <span>187</span>
                    </div>

                    <div className={styles.rateProgress}>
                        <span>1 stars</span>
                        <div className={styles.progressBar}>
                            <div className={styles.progress}></div>
                        </div>
                        <span>187</span>
                    </div>
                </div>
            </div>

            <div className={styles.reviews}>
                <div className={styles.review}>
                    <div className={styles.profileImg}>M</div>
                    <div className={styles.reviewBody}>
                        <h3>Marta</h3>
                        <span>Mazda CX-5</span>
                        <div className={styles.rating}>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <IoMdStar key={rating} />
                            ))}
                            <span>5 - 22nd Oct 2024</span>
                        </div>
                    </div>
                </div>

                <div className={styles.review}>
                    <div className={styles.profileImg}>A</div>
                    <div className={styles.reviewBody}>
                        <h3>Amanda</h3>
                        <span>KIA Sportage</span>
                        <div className={styles.rating}>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <IoMdStar key={rating} />
                            ))}
                            <span>5 - 22nd Oct 2024</span>
                        </div>
                    </div>
                </div>

                <div className={styles.review}>
                    <div className={styles.profileImg}>H</div>
                    <div className={styles.reviewBody}>
                        <h3>Harvey</h3>
                        <span>Nissan Juke</span>
                        <div className={styles.rating}>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <IoMdStar key={rating} />
                            ))}
                            <span>5 - 22nd Oct 2024</span>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    )
}
