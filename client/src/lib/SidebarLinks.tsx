import { FaRegStar } from "react-icons/fa";
import { GiHomeGarage } from "react-icons/gi";
import { IoMdList } from "react-icons/io";
import { RiLogoutCircleLine, RiSettings4Line } from "react-icons/ri";

export const customerLinks = [
    {
        name: 'Home',
        url: '/',
        icon: <GiHomeGarage />
    },
    {
        name: 'Saved Providers',
        url: '/saved-providers',
        icon: <FaRegStar />
    },
    {
        name: 'Settings',
        url: '/settings',
        icon: <RiSettings4Line />
    },
    {
        name: 'Logout',
        url: '/auth/login',
        icon: <RiLogoutCircleLine />
    }
];

export const serviceProviderLinks = [
    {
        name: 'Home',
        url: '/',
        icon: <GiHomeGarage />
    },
    {
        name: 'Saved Providers',
        url: '/saved-providers',
        icon: <FaRegStar />
    },
    {
        name: 'Settings',
        url: '/settings',
        icon: <RiSettings4Line />
    },
    {
        name: 'Logout',
        url: '/auth/login',
        icon: <RiLogoutCircleLine />
    }
];