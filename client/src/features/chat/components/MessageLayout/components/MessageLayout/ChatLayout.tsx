import Messages from '../Messages/Messages'
import MessageInput from '../MessageInput/MessageInput'
import { useGetConversation } from '../../../../hooks/useChat';
import { ChatLayoutProps } from '../../../../types';
import styles from './ChatLayout.module.scss';
import { useAuthContext } from '../../../../../auth/context/auth.context';
import { useEffect } from 'react';
import useSocket from '../../../../../../hooks/useSocket';
import { useQueryClient } from '@tanstack/react-query';

export default function ChatLayout({ selectedConversationId }: ChatLayoutProps) {
    const { data: conversationData, isLoading: isLoadingConversation } = useGetConversation(selectedConversationId);
    const { state } = useAuthContext();
    const { socket } = useSocket(state.currentUser!);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!isLoadingConversation && socket) {
            socket.on('getMessage', (messages) => {
                queryClient.setQueryData(['getConversation', selectedConversationId], (oldData: any) => {
                    if (!oldData) {
                        console.log('No data yet');
                        return null;
                    }
                    console.log(oldData);
                    return {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            messages: [...oldData.data.messages || [], messages]
                        }
                    }
                });
            });

            return () => {
                socket.off('getMessage');
            };
        }
    }, [socket, isLoadingConversation, selectedConversationId, queryClient]);


    const receiver = conversationData?.data?.members.find((member: any) => member._id !== state.userId);

    return (
        <>
            <div className={styles.header}>
                <img src={receiver?.profileImage} alt="" />
                <h3>{receiver?.name}</h3>
            </div>
            <Messages data={conversationData?.data} />
            <MessageInput receiverId={receiver?._id} />
        </>
    )
}
