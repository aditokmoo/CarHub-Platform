import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUserConversation, getUserConversation, getUserConversations, sendMessage } from "../services/chatServices";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function useCreateConversation() {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ["createConversation"],
        mutationFn: (receiverId: string) => createUserConversation(receiverId),
        onSuccess: () => navigate('/messages')
    });

    return mutation;
}


export function useGetUserConversations() {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ["getUserConversations"],
        queryFn: () => getUserConversations(),
        onSuccess: () => {
            queryClient.invalidateQueries('getUserConversations');
        }
    })

    return query;
}

export function useGetConversation(conversationId: string) {
    const query = useQuery({
        queryKey: ["getConversation", conversationId],
        queryFn: () => getUserConversation(conversationId),
    })

    return query;
}

export function useSendMessage(conversationId: string) {
    const mutation = useMutation({
        mutationKey: ["sendMessage"],
        mutationFn: (message: string) => sendMessage(conversationId, message),
    });

    return mutation;
}


export function useListenMessages(conversationId: string) {
    const queryClient = useQueryClient();
    useEffect(() => {
        const socket = io("http://localhost:8000");
        console.log(123)
        // Listen for new messages
        const handleNewMessage = (newMessage: any) => {
            console.log(123)
            queryClient.setQueryData(["getConversation", conversationId], (oldData: any) => {
                console.log('conversationID: ', conversationId)
                if (!oldData) return;

                return {
                    ...oldData,
                    messages: [...oldData.messages, newMessage],
                };
            });
        };

        socket.on("newMessage", () => {
            console.log('newMessage')
        });

        // Clean up on unmount
        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.disconnect(); // Disconnect the socket when component unmounts
        };
    }, []);
}