export interface UserBase {
    name: string;
    email: string;
    password: string,
    profileImage: string;
    phoneNumber: string;
    location: string | { label: string; value: string };
}

export interface ServiceProvider extends UserBase {
    role: 'serviceProvider';
    appointments: string[];
    work: Work[];
    group: string[];
    experience: number;
    membership: number;
    description: string;
    numberOfWorkers: number;
    numberOfServiceBays: number;
    rating: {
        average: number;
        count: number;
    };
}

export interface Customer extends UserBase {
    role: 'customer';
    appointments: string[];
    work: never[];
    group: never[];
    experience: never;
    membership: never;
    description: never;
    numberOfWorkers: never;
    numberOfServiceBays: never;
    rating: never;
}

export type User = ServiceProvider | Customer;

export interface Work {
    workTitle: string;
    workDescription: string;
    images: string[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterRequest extends UserBase {
    password: string;
    role: 'serviceProvider' | 'customer';
}

export interface RegisterResponse {
    message: string;
    user: User;
}