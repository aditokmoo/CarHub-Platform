import { z } from 'zod';

const baseUserSchema = {
    name: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(30),
    profileImage: z.string().optional(),
    phoneNumber: z.string(),
    location: z.enum(["Kakanj", "Sarajevo", "Zenica", "Vitez", "Tuzla", "Vojkovici"]),
    description: z.string().optional(),
    experience: z.string().optional(),
    numberOfWorkers: z.string().optional(),
    numberOfServiceBays: z.string().optional(),
    work: z.array(z.object({
        workTitle: z.string(),
        workDescription: z.string(),
        images: z.array(z.any()).optional(),
    })).optional(),
};

const customerSchema = z.object({
    ...baseUserSchema,
    role: z.literal("customer"),
});

const serviceProviderSchema = z.object({
    ...baseUserSchema,
    role: z.literal("serviceProvider"),
    group: z.array(z.enum(["Mehanic", "Electrician", "Body", "Tuning", "Exhaust", "Transmission", "Detailer", "AC", "Road Rescue", "Tires"])),
});

export const userSchema = z.discriminatedUnion("role", [customerSchema, serviceProviderSchema]);


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
});