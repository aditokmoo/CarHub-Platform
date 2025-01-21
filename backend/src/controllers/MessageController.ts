import asyncHandler from "express-async-handler";
import Message from "../models/Message";
import { Response } from "express";
import { PrivateRequest } from "../types";
import Conversation from "../models/Conversation";

export const getMessages = asyncHandler(async (req: PrivateRequest, res: Response) => {
    const { id: userToChatId } = req.params;
    const senderId = req.id;

    try {
        const conversation = await Conversation.findOne({ members: { $all: [senderId, userToChatId] } }).populate('messages');

        const messages = conversation?.messages || [];

        res.status(200).json({ status: 'success', data: messages })
    } catch (error) {
        console.log("Error in getMessages controller: ", error);
        res.status(500).json({ error: "Something went wrong" });
    }
})

export const sendMessage = asyncHandler(async (req: PrivateRequest, res: Response) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.id;

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
            conversation.lastMessage = newMessage._id;
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export const createUserConversation = asyncHandler(async (req: PrivateRequest, res: Response) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.id;

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }

        res.status(200).json({ status: 'success', data: conversation })

    } catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export const getUserConversations = asyncHandler(async (req: PrivateRequest, res: Response) => {
    try {
        const userId = req.id;

        const conversations = await Conversation.find({ members: userId }).populate('members', 'name profileImage').populate('lastMessage', 'message createdAt senderId receiverId');

        const formattedConversations = conversations?.map((conversation) => {
            const otherUser = conversation.members.find((member: any) => member._id.toString() !== userId);

            return {
                _id: conversation._id,
                user: otherUser,
                lastMessage: conversation.lastMessage,
                updatedAt: conversation.updatedAt,
            };
        });

        res.status(200).json({ status: 'success', data: formattedConversations })
    } catch (error) {
        res.status(500).json(error)
    }
});

export const getUserConversation = asyncHandler(async (req: PrivateRequest, res: Response) => {
    const conversationId = req.params.id;
    const userId = req.id

    try {
        const conversation = await Conversation.findOne({
            members: userId,
            _id: conversationId
        })
            .populate('members', 'name profileImage')
            .populate('messages', 'message createdAt senderId receiverId')
            .sort({ 'messages.createdAt': 1 });

        if (!conversation) {
            res.status(404).json({ error: 'Conversation not found.' });
            return
        }

        res.status(200).json({ status: 'success', data: conversation });
    } catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
