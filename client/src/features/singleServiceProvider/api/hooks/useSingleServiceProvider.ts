import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "../services/SingleServiceProviderServices";

export function useGetSingleUser(userId: string) {
    const query = useQuery({
        queryKey: ['getSingleUser', userId],
        queryFn: () => getSingleUser(userId),
    });

    return query;
}