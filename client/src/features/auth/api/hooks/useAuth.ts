import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAccount, disconnectSocket, getCurrentUser, login, logout } from "../services/authServices";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/auth.context";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoginRequest, LoginResponse, LogoutResponse, RegisterRequest, RegisterResponse, User } from "../../types";

export function useCreateAccount(reset: () => void): UseMutationResult<RegisterResponse, Error, RegisterRequest, unknown> {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: (data: RegisterRequest) => createAccount(data),
        onSuccess: (res: RegisterResponse) => {
            if (res.status === 'success') {
                navigate('/auth/verify')
                reset();
            }

            if (res.status === 500) {
                toast.error('Something went wrong!')
            }
        },
        onError: (err: Error) => {
            console.log(`Create account error: ${err}`);
            toast.error(err.message);
        }
    });

    return mutation;
}

export function useLogin(): UseMutationResult<LoginResponse, Error, LoginRequest, unknown> {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginRequest) => login(data),
        onSuccess: (res: LoginResponse) => {
            console.log(res);

            if (res?.response?.data?.status === 'error') {
                toast.error(res?.response?.data?.message)
                return;
            }

            dispatch({ type: 'SET_CURRENT_USER', payload: res.accessToken });
            dispatch({ type: 'SET_USER_ROLE', payload: res.role });

            navigate('/');

            toast.success('Login successful!');
        },
        onError: (err: Error) => {
            console.log(`Login error: ${err}`);
            toast.error(err.message);
        }
    });

    return mutation;
}

export function useCurrentUser(token: string | null) {
    const query = useQuery({
        queryKey: ['currentUser', token],
        queryFn: () => getCurrentUser(token),
        enabled: !!token
    });

    return query;
}

export function useLogout(): UseMutationResult<LogoutResponse, Error, void> {
    const axiosPrivate = useAxiosPrivate();
    const { dispatch } = useAuthContext();
    const mutation = useMutation({
        mutationFn: () => logout(axiosPrivate),
        mutationKey: ["logout"],
        onSuccess: () => {
            dispatch({ type: 'RESET_AUTH' });
            disconnectSocket();
        },
        onError: (err) => {
            console.log(err)
        }
    });

    return mutation
}