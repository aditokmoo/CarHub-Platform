import axios from "../../../api/http";
import { getUsersEndpoint } from "../endpoints/providers.endpoint";

interface ParamsType {
    type: string,
    category: string,
}

export async function getUsersBy(params: ParamsType) {
    try {
        const res = await axios.get(getUsersEndpoint(params), {
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