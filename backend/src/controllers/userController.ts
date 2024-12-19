import asyncHandler from "express-async-handler";
import User from "../models/User";
import { PrivateRequest } from "../types";

export const getUsers = asyncHandler(async (req, res) => {
    const { type, groups } = req.query;

    const allowedRoles = ["customer", "serviceProvider"];

    if (!allowedRoles.includes(type as string)) {
        res.status(400).json({ status: "error", message: 'Invalid role type. Only "customer" and "serviceProvider" are allowed' });
        return;
    }

    let groupArray: string[] = [];

    if (Array.isArray(groups)) {
        groupArray = groups.map(group => String(group));
    } else if (typeof groups === "string") {
        groupArray = groups.split(",").map(group => group.trim());
    }

    const users = await User.find({
        role: type,
        ...(groupArray.length > 0 && { "serviceProviderDetails.group": { $in: groupArray } })
    }, 'name email id phoneNumber work profileImage appointments group location serviceProviderDetails');

    res.status(200).json({ status: "success", users });
});

export const getUser = asyncHandler(async (req: PrivateRequest, res) => {
    const { id } = req;

    const user = await User.findById(id, 'name email id phoneNumber work profileImage appointments group location serviceProviderDetails');

    if (!user) {
        res.status(400).json({ status: 'error', message: "User dosn't exist!" })
        return;
    }

    res.status(200).json({ status: 'success', user })
})

export const getPublicProfile = asyncHandler(async (req, res) => {
    const { name } = req.params;

    const user = await User.findOne({ name }, 'name email id phoneNumber work profileImage appointments group location serviceProviderDetails');

    if (!user) {
        res.status(400).json({ status: 'error', message: "User dosn't exist!" })
        return;
    }

    res.status(200).json({ status: 'success', user })
})