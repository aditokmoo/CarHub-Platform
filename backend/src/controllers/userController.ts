import asyncHandler from "express-async-handler";
import User from "../models/User";
import { PrivateRequest } from "../types";

export const getUsers = asyncHandler(async (req, res) => {
    const { type, category, search } = req.query;

    const allowedRoles = ["customer", "serviceProvider"];

    if (!allowedRoles.includes(type as string)) {
        res.status(400).json({ status: "error", message: 'Invalid role type. Only "customer" and "serviceProvider" are allowed' });
        return;
    }

    const filter: any = { role: type };

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
        filter["serviceProviderDetails.group"] = category;
    }

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