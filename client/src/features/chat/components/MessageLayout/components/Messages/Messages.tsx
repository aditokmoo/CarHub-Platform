import { useEffect, useRef } from 'react';
import styles from './Messages.module.scss';
import { useCurrentUser } from '../../../../../serviceProviders/api/hooks/useCurrentUser';
import { useAuthContext } from '../../../../../auth/context/auth.context';

interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
}

interface Member {
    _id: string;
    name: string;
    profileImage: string;
}

interface PropTypes {
    data: {
        status: string;
        _id: string;
        members: Member[];
        messages: Message[];
    };
}

export default function Messages({ data }: PropTypes) {
    const { state } = useAuthContext();
    const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser(state.currentUser);

    if (isLoadingCurrentUser) return <h2>Loading...</h2>;

    const currentUserId = currentUser.user._id;

    const messageLayoutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageLayoutRef.current) {
            messageLayoutRef.current.scrollTop = messageLayoutRef.current.scrollHeight;
        }
    }, [data?.messages]);

    return (
        <div className={styles.messageLayout} ref={messageLayoutRef}>
            {data?.messages.map((msg, index) => {
                const isCurrentUser = msg.senderId === currentUserId;
                const sender = data.members.find((member: { _id: string }) => member._id === msg.senderId);

                const nextMessage = data.messages[index + 1];
                const isLastInGroup = !nextMessage || nextMessage.senderId !== msg.senderId;

                return (
                    <div
                        key={msg._id}
                        className={`${styles.messageItem} ${isCurrentUser ? styles.currentUser : styles.otherUser}`}
                    >
                        {!isCurrentUser && isLastInGroup && (
                            <img
                                src={sender?.profileImage}
                                alt={sender?.name}
                                className={styles.avatar}
                            />
                        )}
                        <div className={`${styles.messageContent} ${isCurrentUser ? styles.currentUser : styles.otherUser} ${!isLastInGroup && !isCurrentUser && styles.lastInGroup}`}>
                            <p>{msg.message}</p>
                            <span className={styles.timestamp}>
                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
