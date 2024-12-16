import mongoose from "mongoose"

export interface User {
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
    serviceProviderDetails?: {
        work: {
            workTitle: string,
            workDescription: string,
            images: [File]
        }[],
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