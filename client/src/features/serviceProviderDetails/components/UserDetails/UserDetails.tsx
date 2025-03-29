import { IoMailOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router';
import { useCreateConversation } from '../../../chat/hooks/useChat';
import noProfileImage from '../../../../assets/no-user-image.png';
import { UserResponse } from '../../../auth/types';
import styles from './UserDetails.module.scss'

interface PropTypes {
    user: UserResponse,
    isCurrentUser: boolean
    currentUser: string | null
}

export default function UserDetails({ user, isCurrentUser, currentUser }: PropTypes) {
    const { mutate: createConversation, isPending: isCreatingConversation } = useCreateConversation();
    const navigate = useNavigate();

    return (
        <div className={styles.providerDetails}>
            <div className={styles.details}>
                {user.profileImage ? <img src={user.profileImage} alt="" /> : <img src={noProfileImage} alt="" />}
                <div className={styles.userInfo}>
                    <h4>{user.name}</h4>
                    <span>{user.location}</span>
                </div>
            </div>
            {isCurrentUser ? (
                <button>Edit profile details</button>
            ) : (
                isCreatingConversation ? <button disabled>< IoMailOutline /> Send message</button> : <button onClick={() => !currentUser ? navigate('/auth/login') : createConversation(user._id)}><IoMailOutline />Send message</button>
            )}
        </div>
    )
}
