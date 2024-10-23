import { useQuery } from "@tanstack/react-query";
import { getUsersBy } from "../services/serviceProviderServices";

interface ParamsType {
    type: string;
    groups: string[];
}

export function useGetUsers(params: ParamsType) {
    const query = useQuery({
        queryKey: ['getUsers', params],
        queryFn: () => getUsersBy(params),
    });

    return query;
}
