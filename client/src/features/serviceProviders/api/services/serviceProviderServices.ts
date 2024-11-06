import axios from "../../../../api/http";

interface ParamsType {
    type: string,
    groups: string[],
}

export async function getUsersBy(params: ParamsType) {
    try {
        const { type, groups } = params;

        const queryParams = new URLSearchParams({
            type,
        });

        if (groups.length > 0) {
            queryParams.append('groups', groups.join(','));
        }

        const res = await axios.get(`/api/user?${queryParams.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
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