import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../services/ServiceProviderDetailsServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function usetGetUserDetails() {
    const { id } = useParams();

    const query = useQuery({
        queryKey: ['getUserDetails', id],
        queryFn: () => getUserDetails(id!),
    });

    return query;
}

type SectionTypes = 'overview' | 'location' | 'reviews';

export function useHandleScroll() {
    const [activeSection, setActiveSection] = useState<SectionTypes>('overview');

    useEffect(() => {
        const handleScroll = () => {
            const locationSection = document.getElementById('location')!;
            const reviewsSection = document.getElementById('reviews')!;

            const scrollY = window.scrollY;

            if (scrollY >= reviewsSection.offsetTop - 50) {
                setActiveSection('reviews');
            } else if (scrollY >= locationSection.offsetTop - 50) {
                setActiveSection('location');
            } else {
                setActiveSection('overview');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { activeSection }
}