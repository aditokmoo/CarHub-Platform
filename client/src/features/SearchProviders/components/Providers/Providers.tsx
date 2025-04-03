import { Link } from 'react-router-dom'
import { UserResponse } from '../../../auth/types'
import styles from './Providers.module.scss'

interface PropTypes {
    providers: UserResponse[],
    searchValue: string,
}

export default function Providers({ providers, searchValue }: PropTypes) {
    console.log(providers)
    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;
        if (text.toLowerCase() === query.toLowerCase()) return text; // Ako je potpuno isto, ne highlightuj

        const regex = new RegExp(`(${query})`, "gi");
        return text.split(regex).map((part, index) =>
            regex.test(part) ? (
                <span key={index} className={styles.highlight}>
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <div className={styles.providers}>
            {providers.map((provider) => (
                <Link to={`/serviceProvider/${provider.name}`} className={styles.provider} key={provider._id}>
                    <div className={styles.cardHeader}>
                        <div className={styles.image}>
                            <span className={styles.onlineStatus}>
                                <span className={styles.status}></span>
                            </span>
                            <img src={provider.profileImage} alt={`${provider.name} profile image`} />
                        </div>
                        <div className={styles.details}>
                            <span>Owner Name</span>
                            <span>{highlightMatch(provider.name, searchValue)}</span>
                            <span>{provider.location}</span>
                        </div>
                    </div>
                    <div className={styles.achievments}></div>
                    <div className={styles.categories}>
                        {provider.serviceProviderDetails.group.map((category) => (
                            <span key={category} className={styles.category}>{category}</span>
                        ))}
                    </div>
                    <div className={styles.desc}>
                        <p>{provider.serviceProviderDetails.description.length > 275 ? `${provider.serviceProviderDetails.description.slice(0, 275)}...` : provider.serviceProviderDetails.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
