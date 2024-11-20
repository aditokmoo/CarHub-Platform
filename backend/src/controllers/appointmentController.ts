import asyncHandler from "express-async-handler";
import Appointment from "../models/Appointment";
import User from "../models/User";
import { Response } from "express";
import { PrivateRequest } from "../types";

export const createAppointment = asyncHandler(async (req, res) => {
    const { customer, serviceProvider, date, time, note } = req.body;

    if (!customer || !serviceProvider || !date || !time) {
        res.status(400).json({ status: 'error', message: 'All fields are required' });
        return;
    }

    const customerExist = await User.findById(customer).select('-password');
    const serviceProviderExist = await User.findById(serviceProvider).select('-password');

    if(!customerExist || !serviceProviderExist) {
        res.status(400).json({ status: 'error', message: "User dosn't exist!" })
        return;
    }

    if(customerExist.role !== 'customer') {
        res.status(403).json({ status: 'error', message: 'Only customer can create appointments' })
        return;
    }

    const appointment = await Appointment.create({
        customer,
        serviceProvider,
        date,
        time,
        note
    });

    customerExist.appointments.push(appointment._id);
    serviceProviderExist.appointments.push(appointment._id);

    await customerExist.save();
    await serviceProviderExist.save();

    res.status(200).json({ status: 'success', appointment })
});

export const getAppointments = asyncHandler(async (req: PrivateRequest, res: Response) => {
    const currentUserId = req.id;
    
    const user = await User.findById(currentUserId).select('-password');

    if (!user) {
        res.status(404).json({ status: 'error', message: 'User not found' });
        return;
    }

    const appointments = await Appointment.find({
        $or: [
            { customer: currentUserId },
            { serviceProvider: currentUserId }
        ]
    });

    res.status(200).json({ status: 'success', appointments });
});