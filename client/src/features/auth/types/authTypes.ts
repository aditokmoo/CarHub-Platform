export interface UserBase {
    name: string;
    email: string;
    password: string,
    profileImage: string;
    phoneNumber: string;
    location: string | { label: string; value: string };
    role: 'serviceProvider' | 'customer';
}

export interface User extends UserBase {
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

export interface UserResponse extends UserBase {
    location: string;
    serviceProviderDetails: User
}

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