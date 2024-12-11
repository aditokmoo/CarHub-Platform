import styles from './Overview.module.scss'

interface PropTypes {
    name: string,
    profession: string,
    description: string,
    experience: number,
    member: number,
    specialist: string[],
    serviceBays: number,
    workers: number,
}

export default function Overview({ name, profession, description, experience, member, specialist, serviceBays, workers }: Readonly<PropTypes>) {
    return (
        <div className={styles.overview}>
            <ul className={styles.badgeList}>
                <li>{experience} {experience > 1 ? 'Years' : 'Year'} Experience</li>
                <li>{member} {member > 1 ? 'Years' : 'Year'} Member</li>
                <li>{specialist} Specialist</li>
                <li>{serviceBays} Service Bay</li>
                <li>{workers} Workers</li>
            </ul>

            <div className={styles.about}>
                <h3>About {name}</h3>
                <span>{profession}</span>
                <p>{description}</p>
            </div>
        </div>
    )
}
