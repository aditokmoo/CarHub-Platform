import { useEffect, useRef } from 'react';
import { useAuthContext } from '../../../../../auth/context/auth.context';
import { useCurrentUser } from '../../../../../auth/api/hooks/useAuth';
import { MessageProps } from '../../../../types';
import ReactLoading from 'react-loading';
import styles from './Messages.module.scss';

export default function Messages({ data }: MessageProps) {
    const { state } = useAuthContext();
    const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser(state.currentUser);

    if (isLoadingCurrentUser) return <ReactLoading type={'spin'} color={'green'} height={'5rem'} width={'5rem'} className='loading_spinner' />;

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
