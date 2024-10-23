import styles from './Overview.module.scss'

interface PropTypes {
    name: string,
    profession: string,
}

export default function Overview({ name, profession }: PropTypes) {
    return (
        <div className={styles.overview}>
            <ul className={styles.badgeList}>
                <li>2 Years Experience</li>
                <li>1 Year Member</li>
                <li>Exhaust Specialist</li>
                <li>1 Service Bay</li>
                <li>4 Workers</li>
            </ul>

            <div className={styles.about}>
                <h3>About {name}</h3>
                <span>{profession}</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis beatae modi quos magni culpa enim ad ut soluta omnis provident voluptatum atque facere impedit obcaecati, minima voluptas pariatur, deserunt non. Repellat aperiam cum quia labore aliquam ipsa autem assumenda maiores. Facilis nemo voluptatibus veritatis harum blanditiis reiciendis labore repudiandae adipisci asperiores ipsam, illum voluptas nisi hic repellendus aspernatur nesciunt!</p>
            </div>
        </div>
    )
}
