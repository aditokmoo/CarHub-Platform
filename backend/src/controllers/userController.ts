import asyncHandler from "express-async-handler";
import User from "../models/User";
import { PrivateRequest } from "../types";
import { userFilter } from "../utils/userFilter";

export const getUsers = asyncHandler(async (req, res) => {
    const { type, category, search, location, availability } = req.query;

    const allowedRoles = ["customer", "serviceProvider"];

    if (!allowedRoles.includes(type as string)) {
        res.status(400).json({ status: "error", message: 'Invalid role type. Only "customer" and "serviceProvider" are allowed' });
        return;
    }

    const filter = userFilter({
        type: type as string,
        name: search as string,
        group: category as string,
        location: location as string,
        availability: availability as string,
    });

    const users = await User.find(filter,
        'name email id phoneNumber work profileImage group location serviceProviderDetails confirmed'
    );

    res.status(200).json({ status: "success", users });
});

export const getUser = asyncHandler(async (req: PrivateRequest, res) => {
    const { id } = req;

    const user = await User.findById(id, 'name email id phoneNumber work profileImage group location serviceProviderDetails');

    if (!user) {
        res.status(400).json({ status: 'error', message: "User dosn't exist!" })
        return;
    }

    res.status(200).json({ status: 'success', user })
})

export const getPublicProfile = asyncHandler(async (req, res) => {
    const { name } = req.params;

    const user = await User.findOne({ name }, 'name email id phoneNumber work profileImage group location serviceProviderDetails');

    if (!user) {
        res.status(400).json({ status: 'error', message: "User dosn't exist!" })
        return;
    }

    res.status(200).json({ status: 'success', user })
})