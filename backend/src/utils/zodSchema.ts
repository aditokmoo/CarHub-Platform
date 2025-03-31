import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(30),
    profileImage: z.string().optional(),
    role: z.enum(['customer', 'serviceProvider']),
    phoneNumber: z.string(),
    location: z.enum(["Kakanj", "Sarajevo", "Zenica", "Vitez", "Tuzla", "Vojkovici"]),
    group: z.enum(["Mehanic", "Electrician", "Body", "Tuning", "Exhaust", "Transmission", "Detailer", "AC", "Road Rescue", "Tires"]),
    description: z.string().optional(),
    membership: z.string(),
    experience: z.string().optional(),
    numberOfWorkers: z.string().optional(),
    numberOfServiceBays: z.string().optional(),
    work: z.array(z.object({
        workTitle: z.string(),
        workDescription: z.string(),
        images: z.array(z.string()).optional(),
    })).optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
});