import { Request } from "express";
import mongoose from "mongoose";

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
        experience: Number,
        membership: Number,
        description: String,
        numberOfWorkers: Number,
        numberOfServiceBays: Number,
        rating: {
            average: Number,
            count: Number,
        },
    }
}

export interface UploadedFile {
    filename: string;
}

export interface PrivateRequest extends Request {
    id?: string
}