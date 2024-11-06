import validator from 'validator';
import bcrypt from 'bcrypt';

import mongoose, { Schema } from 'mongoose';
import { User } from '../types';

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
    profileImage: { type: String },
    workImages: {
        type: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                images: [String]
            }
        ],
    },
    role: {
        type: String,
        enum: ['customer', 'serviceProvider'],
        required: true,
    },
    group: {
        type: [String],
        enum: ['Mehanic', 'Electrician', 'Body specialist', 'Tuning', 'Exhaust', 'Transmission', 'Detailer'],
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
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password cant be less than 6 characters'],
        maxLength: [25, 'Password cant be higher than 25 characters'],
    },
    rating: {
        average: { type: Number, min: 0, max: 5, default: 0 },
        count: { type: Number, default: 0 }
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    confirmed: {
        type: Boolean,
        default: false,
    },
    confirmToken: {
        type: String,
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const User = mongoose.model<User>('User', userSchema);

export default User;