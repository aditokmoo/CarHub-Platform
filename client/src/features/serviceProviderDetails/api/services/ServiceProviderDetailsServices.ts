import { axiosPrivate } from "../../../../api/http";

export async function getUserDetails(userId: string) {
    try {
        const res = await axiosPrivate.get(`/api/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        const data = res.data.user;
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}