
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../../auth/context/auth.context";
import { refreshToken } from "../../../auth/api/services/authServices";

export const useRefreshToken = () => {
    const { dispatch } = useAuthContext();

    const mutation = useMutation({
        mutationFn: () => refreshToken(),
        onSuccess: (newUserAccess) => {
            dispatch({ type: 'SET_CURRENT_USER', payload: newUserAccess.accessToken });
            dispatch({ type: 'SET_USER_ROLE', payload: newUserAccess.role });
        },
        onError: (error) => {
            console.error(`Token refresh failed: ${error}`);
            dispatch({ type: 'RESET_AUTH' });
        },
    });

    return mutation;
};
