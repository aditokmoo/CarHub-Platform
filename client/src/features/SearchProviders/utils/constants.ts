import { locations } from "../../../utils/constants";

export const filterList = [
    {
        id: 2,
        title: 'Category',
        options: [
            { id: 'Mehanic', title: 'Mehanic' },
            { id: 'Electrician', title: 'Electrician' },
            { id: 'Detailer', title: 'Detailer' },
            { id: 'Body', title: 'Body' },
            { id: 'Exhaust', title: 'Exhaust' },
            { id: 'Tuning', title: 'Tuning' },
            { id: 'Transmission', title: 'Transmission' },
            { id: 'Tires', title: 'Tires' },
            { id: 'AC', title: 'AC' },
            { id: 'Road Rescue', title: 'Road Rescue' },
        ]
    },
    {
        id: 3,
        title: 'Location',
        options: locations.map((location) => ({ id: location, title: location }))
    },
    {
        id: 4,
        title: 'Availability',
        options: [
            { id: 'online', title: 'Online' },
            { id: 'offline', title: 'Offline' },
        ]
    },
]