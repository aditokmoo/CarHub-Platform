import { useQuery } from "@tanstack/react-query";
import { getUserConversation, getUserConversations } from "../services/userServices";

export function useGetUserConversations() {
    const query = useQuery({
        queryKey: ["getUserConversations"],
        queryFn: () => getUserConversations(),
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