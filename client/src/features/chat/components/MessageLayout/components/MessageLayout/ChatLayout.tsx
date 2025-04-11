import { useGetConversation } from '../../../../hooks/useChat';
import { ChatLayoutProps } from '../../../../types';
import { useAuthContext } from '../../../../../auth/context/auth.context';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useSocket from '../../../../../../hooks/useSocket';
import MessageHeader from '../MessageHeader/MessageHeader';
import Messages from '../Messages/Messages'
import MessageInput from '../MessageInput/MessageInput'

export default function ChatLayout({ selectedConversationId, setSelectedConversationId }: ChatLayoutProps) {
    const { data: conversationData, isLoading: isLoadingConversation } = useGetConversation(selectedConversationId);
    const { state } = useAuthContext();
    const { socket } = useSocket(state.currentUser!);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!isLoadingConversation && socket) {
            socket.on('getMessage', (messages) => {
                queryClient.setQueryData(['getConversation', selectedConversationId], (oldData: any) => {
                    if (!oldData) return null;
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
            <MessageHeader setSelectedConversationId={setSelectedConversationId} receiver={receiver} />
            <Messages data={conversationData?.data} />
            <MessageInput receiverId={receiver?._id} />
        </>
    )
}
