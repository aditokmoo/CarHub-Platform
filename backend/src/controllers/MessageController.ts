import asyncHandler from "express-async-handler";
import Message from "../models/Message";
import { Response } from "express";
import { PrivateRequest } from "../types";
import cloudinary from "../utils/cloudinaryConfig";

export const getMessages = asyncHandler(async (req: PrivateRequest, res: Response) => {
    const { id: userForChat } = req.params;
    const myId = req.id;

    const message = await Message.find({
        $or: [
            { senderId: myId, receiverId: userForChat },
            { senderId: userForChat, receiverId: myId }
        ],
    });

    res.status(200).json({ status: 'success', message })
})

export const sendMessage = asyncHandler(async (req: PrivateRequest, res: Response) => {
    const { id: receiverId } = req.params;
    const senderId = req.id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
        senderId,
        receiverId,
        text,
        image: imageUrl
    });

    await newMessage.save();

    res.status(201).json({ status: 'success', message: newMessage })
})