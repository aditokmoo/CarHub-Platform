import { axiosPrivate } from "../api/http";
import { useEffect } from "react";
import { useAuthContext } from "../features/auth/context/auth.context";
import { refreshToken } from "../features/auth/api/services/authServices";

export default function useAxiosPrivate() {
    const { state, dispatch } = useAuthContext();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Barear ${state.currentUser}`;
            }
            return config;
        }, (error) => Promise.reject(error))

        const responseIntercept = axiosPrivate.interceptors.response.use(res => res, async (error) => {
            const prevReq = error?.config;
            if (error?.response?.status === 403 && !prevReq?.sent) {
                prevReq.sent = true;
                const newUserAccess = await refreshToken();
                prevReq.headers['Authorization'] = `Barear ${newUserAccess.accessToken}`;
                dispatch({ type: "SET_CURRENT_USER", payload: newUserAccess.accessToken })
                dispatch({ type: "SET_USER_ROLE", payload: newUserAccess.role })
                dispatch({ type: "SET_USER_ID", payload: newUserAccess.userId })
                return axiosPrivate(prevReq)
            }
            return Promise.reject(error)
        });

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [state.currentUser, refreshToken])

    return axiosPrivate;
}