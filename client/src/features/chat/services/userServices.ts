import { axiosPrivate } from "../../../api/http";

export async function getUserConversations() {
    try {
        const res = await axiosPrivate.get('/api/message/user-conversations');
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getUserConversation(id: string) {
    try {
        const res = await axiosPrivate.get(`/api/message/user-conversations/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}