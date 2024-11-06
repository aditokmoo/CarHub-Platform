import { Request } from "express";
import mongoose from "mongoose";

export interface User {
    id: string,
    name: string,
    email: string,
    profileImage: File,
    workImages?: {
        title: string,
        description: string,
        images: [File]
    }[],
    role: 'customer' | 'serviceProvider',
    group?: string[],
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

export interface PrivateRequest extends Request {
    id?: string
}