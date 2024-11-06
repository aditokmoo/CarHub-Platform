import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/currentUserServices";

export function useCurrentUser(token: string | null) {
    const query = useQuery({
        queryKey: ['currentUser', token],
        queryFn: () => getCurrentUser(token),
        enabled: !!token
    });

    return query;
}