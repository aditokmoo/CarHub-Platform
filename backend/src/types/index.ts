import { Request } from "express";
import mongoose from "mongoose";

export interface User {
    id: string,
    name: string,
    email: string,
    profileImage: File,
    workImages: File[],
    role: 'customer' | 'serviceProvider',
    group: string[],
    phoneNumber: string,
    password: string,
    location: {
        label: string,
        value: string
    },
    appointments: string[],
    confirmToken: string,
    confirmed: boolean,
}

export interface AppointmentRequest extends Request {
    id?: mongoose.Types.ObjectId
}