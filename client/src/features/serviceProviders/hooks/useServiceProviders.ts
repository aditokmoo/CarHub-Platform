import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getUsersBy } from "../services/serviceProviderServices";
import { useEffect, useState } from "react";

interface ParamsType {
    type: string,
    category?: string,
    search?: string,
    availability?: string,
    location?: string,
    page?: number,
    limit?: number
}

export function useGetUsers(params: ParamsType) {
    const {
        data,
        status,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['getUsers', params],
        queryFn: ({ pageParam = 1 }) => getUsersBy({ ...params, page: pageParam, limit: 4 }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
        },
    });

    return { data, status, error, fetchNextPage, hasNextPage, isFetchingNextPage };
}

export function useHandleSlider() {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleSlider = () => {
            if (window.scrollY > 790) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        };

        window.addEventListener('scroll', handleSlider);

        return () => window.removeEventListener('scroll', handleSlider);
    }, []);

    return { isScrolled }
}