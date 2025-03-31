import { BiWind } from "react-icons/bi";
import { FaTools } from "react-icons/fa";
import { GiCarDoor, GiCarWheel, GiGearStick, GiTowTruck } from "react-icons/gi";
import { MdCo2, MdElectricalServices } from "react-icons/md";
import { LiaShowerSolid } from "react-icons/lia";
import { CgSmartphoneChip } from "react-icons/cg";

export const ServiceTypes = [
    {
        name: 'Mehanic',
        color: '#4B6587',
        icon: <FaTools />
    },
    {
        name: 'Electrician',
        color: '#FFD700',
        icon: <MdElectricalServices />
    },
    {
        name: 'Detailer',
        color: '#9B59B6',
        icon: <LiaShowerSolid />
    },
    {
        name: 'Body',
        color: '#E74C3C',
        icon: <GiCarDoor />
    },
    {
        name: 'Exhaust',
        color: '#95A5A6',
        icon: <MdCo2 />
    },
    {
        name: 'Tuning',
        color: '#27AE60',
        icon: <CgSmartphoneChip />
    },
    {
        name: 'Transmission',
        color: '#2C3E50',
        icon: <GiGearStick />
    },
    {
        name: 'Tires',
        color: '#4B6587',
        icon: <GiCarWheel />
    },
    {
        name: 'AC',
        color: '#FFD700',
        icon: <BiWind />
    },
    {
        name: 'Road Rescue',
        color: '#FFD700',
        icon: <GiTowTruck />
    },
]