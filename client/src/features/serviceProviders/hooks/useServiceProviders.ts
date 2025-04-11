import { useQuery } from "@tanstack/react-query";
import { getUsersBy } from "../services/serviceProviderServices";
import { useEffect, useState } from "react";

interface ParamsType {
    type: string;
    search?: string;
    category?: string;
    availability?: string;
    location?: string;
}

export function useGetUsers(params: ParamsType) {
    const query = useQuery({
        queryKey: ['getUsers', params],
        queryFn: () => getUsersBy(params),
        staleTime: 5 * 60 * 1000,
    });

    return query;
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