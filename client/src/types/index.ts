export interface User {
    _id: string,
    name: string,
    email: string,
    profileImage: string,
    role: 'customer' | 'serviceProvider',
    group: string[],
    phoneNumber: string,
    password: string,
    location: {
        label: string,
        value: string,
    },
    appointments: string[]
    serviceProviderDetails: {
        work: {
            title: string,
            description: string,
            images: [string]
        }[],
        group: string[],
        experience: Number,
        membership: Number,
        description: String,
        numberOfWorkers: Number,
        numberOfServiceBays: Number,
        rating: {
            average: string,
            count: string,
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