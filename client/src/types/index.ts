export interface Work {
    workTitle: string,
    workDescription: string,
    images: File[]
}

export interface User {
    name: string,
    email: string,
    profileImage: string,
    role: 'customer' | 'serviceProvider',
    phoneNumber: string,
    password: string,
    location: string | { label: string; value: string };
    appointments: string[]
    work: Work[],
    group: string[],
    experience: Number,
    membership: Number,
    description: String,
    numberOfWorkers: Number,
    numberOfServiceBays: Number,
    rating: {
        average: number,
        count: number,
    },
}

export interface UserResponse {
    name: string,
    email: string,
    profileImage: string,
    role: 'customer' | 'serviceProvider',
    phoneNumber: string,
    password: string,
    location: string;
    appointments: string[]
    serviceProviderDetails: {
        work: Work[],
        group: string[],
        experience: Number,
        membership: Number,
        description: String,
        numberOfWorkers: Number,
        numberOfServiceBays: Number,
        rating: {
            average: number,
            count: number,
        },
    }
}

export interface Appointment {
    customer: string,
    serviceProvider: string,
    date: Date,
    time: string,
    status: string,
    note: string,
}