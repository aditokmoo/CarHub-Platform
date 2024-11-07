import asyncHandler from 'express-async-handler';
import User from '../models/User';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail';
import { UploadedFile, User as UserType } from '../types';
import { handleFileUploads } from '../utils/fileUpload';

export const createAccount = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, location, role, group, experience, membership, numberOfWorkers, numberOfServiceBays, average, count, title, description } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ status: 'error', message: 'User already exists' });
        return
    }

    const { workImages, profileImage } = handleFileUploads(req.files as { [fieldname: string]: UploadedFile[] } | undefined);

    const newUser = await User.create({
        name,
        email,
        password,
        phoneNumber,
        location,
        profileImage,
        role,
        serviceProviderDetails: {
            group,
            experience: Number(experience),
            membership: Number(membership),
            description,
            numberOfWorkers: Number(numberOfWorkers),
            numberOfServiceBays: Number(numberOfServiceBays),
            rating: {
                average: Number(average),
                count: Number(count),
            },
            workImages: [{
                title,
                description: 'LOREM IPSUM DOLOR SIT AMET TEST HARD CODED',
                images: workImages,
            }]
        }
    });

    const confirmToken = crypto.randomBytes(12).toString('hex');
    newUser.confirmToken = crypto.createHash('sha256').update(confirmToken).digest('hex');
    await newUser.save({ validateBeforeSave: false });

    await sendEmail(newUser as unknown as UserType, confirmToken);

    res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            profileImage: newUser.profileImage,
            location,
            serviceProviderDetails: newUser.serviceProviderDetails
        }
    });
});

export const verifyAccount = asyncHandler(async (req, res) => {
    const { confirmToken } = req.params;
    if (!confirmToken) {
        res.status(401).json({ status: 'error', message: 'Invalid token' })
        return;
    }

    const hashConfirmToken = crypto.createHash("sha256").update(confirmToken).digest('hex');
    const user = await User.findOne({ confirmToken: hashConfirmToken, confirmed: false });
    if (!user) {
        res.status(401).json({ status: 'error', message: 'Invalid token, user dosnt exist' })
        return;
    }
    user.confirmed = true;
    user.confirmToken = undefined;

    await user?.save({ validateBeforeSave: false });

    res.status(200).json({ status: 'success', message: 'Account has been verified' });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ status: 'error', message: 'All fields are required' })
        return;
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
        res.status(401).json({ status: 'error', message: "Unauthorized, user dosn't exist" })
        return;
    }

    if (!user.confirmed) {
        res.status(401).json({ status: 'error', message: 'You need to verify first. Verification link is on your email' })
        return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        res.status(401).json({ status: 'error', message: "Password dosn't match" })
        return;
    }

    const accessToken = jwt.sign(
        {
            UserInfo: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        },
        process.env.ACCESS_TOKEN!,
        { expiresIn: '30m' }
    );

    const refreshToken = jwt.sign(
        { name: user.name },
        process.env.REFRESH_TOKEN!,
        { expiresIn: '1d' }
    );

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ status: 'success', role: user.role, accessToken });
});

export const refresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        res.status(401).json({ status: 'error', message: "Unauthorized" });
        return;
    }

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN!, async (err: VerifyErrors | null, decode: JwtPayload | string | undefined) => {
        if (err) {
            res.status(403).json({ status: 'error', message: 'Forbidden' });
            return;
        }

        if (typeof decode !== 'object' || !decode) {
            res.status(403).json({ status: 'error', message: 'Invalid token' });
            return;
        }

        const name = (decode as JwtPayload).name;

        if (!name) {
            res.status(403).json({ status: 'error', message: 'Invalid token data' });
            return;
        }

        const user = await User.findOne({ name });
        if (!user) {
            res.status(401).json({ status: 'error', message: 'Unauthorized' });
            return;
        }

        const accessToken = jwt.sign(
            {
                UserInfo: {
                    id: user._id,
                    name: user.name,
                    role: user.role,
                },
            },
            process.env.ACCESS_TOKEN!,
            { expiresIn: '1d' }
        );

        res.status(200).json({ status: 'success', role: user.role, accessToken });
    });
});

export const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(204)
        return;
    }

    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    })

    res.status(200).json({ status: 'success', message: 'Cookie cleared' });
});