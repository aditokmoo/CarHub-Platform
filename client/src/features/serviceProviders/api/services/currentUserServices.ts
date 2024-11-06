import { axiosPrivate } from "../../../../api/http";

export async function getCurrentUser(token: string | null) {
    if(!token) return null;
    try {
        const res = await axiosPrivate.get('/api/user/me', {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            },
            withCredentials: true,
        });

        const data = res.data;
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}