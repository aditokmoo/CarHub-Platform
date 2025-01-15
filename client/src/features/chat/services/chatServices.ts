import { axiosPrivate } from "../../../api/http";

export async function createUserConversation(receiverId: string) {
    try {
        const res = await axiosPrivate.post(`/api/message/user-conversations/${receiverId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getUserConversations() {
    try {
        const res = await axiosPrivate.get('/api/message/user-conversations');
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getUserConversation(conversationId: string) {
    try {
        const res = await axiosPrivate.get(`/api/message/user-conversations/${conversationId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function sendMessage(conversationId: string, message: string) {
    try {
        const res = await axiosPrivate.post(`/api/message/send/${conversationId}`, { message });
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
