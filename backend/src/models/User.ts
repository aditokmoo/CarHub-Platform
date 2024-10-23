import validator from 'validator';
import bcrypt from 'bcrypt';

import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please provide name'],
        minLength: [2, 'Name must contain at least 2 characters'],
        maxLength: [30, 'Name cant be higher than 15 characters']
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
    workImages: { type: [String], default: [] },
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
    confirmed: {
        type: Boolean,
        default: false,
    },
    confirmToken: {
        type: String,
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const User = mongoose.model('User', userSchema);

export default User;