import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUserConversation, getUserConversation, getUserConversations, sendMessage } from "../services/chatServices";
import { useNavigate } from "react-router";

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