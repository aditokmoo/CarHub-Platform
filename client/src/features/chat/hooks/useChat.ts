import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { createUserConversation, getUserConversation, getUserConversations, sendMessage } from "../services/chatServices";
import { useNavigate } from "react-router";
import { Conversation, ConversationResponse, Message } from "../../../types";

export function useCreateConversation(): UseMutationResult<ConversationResponse<Conversation>, Error, string> {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ["createConversation"],
        mutationFn: (receiverId: string) => createUserConversation(receiverId),
        onSuccess: () => navigate('/messages')
    });

    return mutation;
}


export function useGetUserConversations(): UseQueryResult<ConversationResponse<Conversation[]>> {
    const query = useQuery({
        queryKey: ["getUserConversations"],
        queryFn: () => getUserConversations(),
    })

    return query;
}

export function useGetConversation(conversationId: string): UseQueryResult<ConversationResponse<Conversation>> {
    const query = useQuery<ConversationResponse<Conversation>, Error>({
        queryKey: ["getConversation", conversationId],
        queryFn: () => getUserConversation(conversationId),
    });

    return query;
}

export function useSendMessage(receiverId: string): UseMutationResult<Message, Error, string> {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ["sendMessage"],
        mutationFn: (message: string) => sendMessage(receiverId, message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getConversation"] });
        },
    });

    return mutation;
}