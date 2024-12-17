import mongoose from "mongoose"

export interface UserBase {
    id: string,
    name: string,
    email: string,
    profileImage: File,
    role: 'customer' | 'serviceProvider',
    phoneNumber: string,
    password: string,
    location: {
        label: string,
        value: string
    },
    appointments: mongoose.Types.ObjectId[],
    confirmToken?: string,
    confirmed: boolean,
}

export interface Work {
    workTitle: string,
    workDescription: string,
    images: [File]
}

export interface UserResponse extends UserBase {
    serviceProviderDetails?: {
        work: Work[],
        group: string[],
        experience: number,
        membership: number,
        description: string,
        numberOfWorkers: number,
        numberOfServiceBays: number,
        rating: {
            average: number,
            count: number,
        },
    }
}

export interface UserRequest extends UserBase {
    work: string,
    group: string[],
    experience: number,
    membership: number,
    description: string,
    numberOfWorkers: number,
    numberOfServiceBays: number,
    rating: {
        average: number,
        count: number,
    },
}