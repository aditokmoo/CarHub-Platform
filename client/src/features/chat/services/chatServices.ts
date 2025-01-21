import { AxiosError } from "axios";
import { axiosPrivate } from "../../../api/http";
import { Conversation, ConversationResponse, Message } from "../../../types";

export async function createUserConversation(receiverId: string): Promise<ConversationResponse<Conversation>> {
    try {
        const res = await axiosPrivate.post(`/api/message/user-conversations/${receiverId}`);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Axios error creating user conversation:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to create user conversation');
        }

        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
    }
}

export async function getUserConversations(): Promise<ConversationResponse<Conversation[]>> {
    try {
        const res = await axiosPrivate.get('/api/message/user-conversations');
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Axios error getting user conversations:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to get user conversations');
        }

        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
    }
}

export async function getUserConversation(conversationId: string): Promise<ConversationResponse<Conversation>> {
    try {
        const res = await axiosPrivate.get(`/api/message/user-conversations/${conversationId}`);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Axios error getting user conversation:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to get user conversation');
        }

        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
    }
}

export async function sendMessage(receiverId: string, message: string): Promise<Message> {
    try {
        const res = await axiosPrivate.post(`/api/message/send/${receiverId}`, { message });
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Axios error sending message:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to send message');
        }

        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
    }
}
