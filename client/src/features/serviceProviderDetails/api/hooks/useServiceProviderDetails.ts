import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../services/ServiceProviderDetailsServices";

export function usetGetUserDetails(userId: string) {
    const query = useQuery({
        queryKey: ['getUserDetails', userId],
        queryFn: () => getUserDetails(userId),
    });

    return query;
}