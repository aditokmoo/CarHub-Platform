import { useQuery } from "@tanstack/react-query";
import { getUsersBy } from "../services/serviceProviderServices";
import { useEffect, useState } from "react";

interface ParamsType {
    type: string;
    category: string;
}

export function useGetUsers(params: ParamsType) {
    const query = useQuery({
        queryKey: ['getUsers', params],
        queryFn: () => getUsersBy(params),
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