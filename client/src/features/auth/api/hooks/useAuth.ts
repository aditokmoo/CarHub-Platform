import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAccount, login, logout } from "../services/authServices";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/auth.context";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { User } from "../../../../types";

export function useCreateAccount() {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: (data: User) => createAccount(data),
        onSuccess: (res) => {
            if(res.status === 200) {
                navigate('/auth/verify')
                toast.success('Account has been created');
            }
            
            if(res.status === 500) {
                toast.error('Something went wrong!')
            }
            console.log(res)
        },
        onError: (err: Error) => {
            console.log(`Create account error: ${err}`);
            toast.error(err.message);
        }
    });

    return mutation;
}

export function useLogin() {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: User) => login(data),
        onSuccess: (res) => {
            console.log(res);
            
            if(res?.response?.data?.status === 'error') {
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

export function useLogout() {
    const axiosPrivate = useAxiosPrivate();
    const { dispatch } = useAuthContext();
    const mutation = useMutation({
        mutationFn: () => logout(axiosPrivate),
        mutationKey: ["logout"],
        onSuccess: () => {
            dispatch({ type: 'RESET_AUTH' });
        },
        onError: (err) => {
            console.log(err)
        }
    });

    return mutation
}