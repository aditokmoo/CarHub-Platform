import validator from 'validator';
import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import { UserResponse } from '../types/userTypes';

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please provide name'],
        minLength: [2, 'Name must contain at least 2 characters'],
        maxLength: [40, 'Name cant be higher than 30 characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password cant be less than 6 characters'],
        maxLength: [25, 'Password cant be higher than 25 characters'],
    },
    profileImage: { type: String },
    role: {
        type: String,
        enum: ['customer', 'serviceProvider'],
        required: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number required'],
    },
    location: {
        type: String,
        required: [true, 'Please select your location']
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
    }],
    confirmed: {
        type: Boolean,
        default: false,
    },
    confirmToken: {
        type: String,
    },
    serviceProviderDetails: {
        group: {
            type: [String],
            enum: ['Mehanic', 'Electrician', 'Body specialist', 'Tuning', 'Exhaust', 'Transmission', 'Detailer', 'AC Technician', 'Road Rescue', 'Tires'],
        },
        experience: {
            type: Number,
            required: function () {
                return (this as { role: 'serviceProvider' }).role === 'serviceProvider';
            },
            message: 'Please enter your experience',
        },
        membership: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            default: ''
        },
        numberOfWorkers: {
            type: Number,
            required: function () {
                return (this as { role: 'serviceProvider' }).role === 'serviceProvider';
            },
            message: 'Enter how many workers you have',
        },
        numberOfServiceBays: {
            type: Number,
            default: 1
        },
        work: {
            type: [
                {
                    workTitle: { type: String, required: true },
                    workDescription: { type: String, required: true },
                    images: [String]
                }
            ],
        },
        rating: {
            average: { type: Number, min: 0, max: 5, default: 0 },
            count: { type: Number, default: 0 }
        },
    },
}, { timestamps: true });

userSchema.pre('validate', function (next) {
    if (this.role === 'customer') {
        this.serviceProviderDetails = undefined;
    }
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model<UserResponse>('User', userSchema);

export default User;