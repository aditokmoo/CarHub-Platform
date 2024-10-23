export interface User {
    _id: string,
    name: string,
    email: string,
    profileImage: string,
    workImages: string[],
    role: 'customer' | 'serviceProvider',
    group: string[],
    phoneNumber: string,
    password: string,
    location: {
        label: string,
        value: string
    },
    appointments: string[]
}

export interface Appointment {
    customer: string,
    serviceProvider: string,
    date: Date,
    time: string,
    status: string,
    note: string,
}