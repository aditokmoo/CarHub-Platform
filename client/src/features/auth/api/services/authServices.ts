import { AxiosError, AxiosInstance } from "axios";
import axios, { axiosPrivate } from "../../../../api/http";
import { LoginRequest, LoginResponse, LogoutResponse, RegisterRequest, RegisterResponse } from "../../types";
import { io } from 'socket.io-client'
import { buildFormData } from "../../utils/authHelpers";

export async function createAccount(credentials: RegisterRequest): Promise<RegisterResponse> {
    const formData = buildFormData(credentials);

    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    try {
        const res = await axios.post('/api/auth/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Axios error when creating user:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to create user');
        }

        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
    }
}


export async function login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
        const res = await axios.post('/api/auth/login', JSON.stringify(credentials), {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return res?.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Axios error when logging in:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to login');
        }

        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
    }
}

export async function getCurrentUser(token: string | null) {
    if (!token) return null;
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

export async function disconnectSocket(): Promise<void> {
    console.log('disconnected')
    const socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.disconnect();
}

export async function refreshToken(): Promise<LoginResponse> {
    try {
        const res = await axios.get('/api/auth/refresh', {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Axios error when refreshing token:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to refresh token');
        }

        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
    }
}

export async function logout(axiosPrivate: AxiosInstance): Promise<LogoutResponse> {
    try {
        const res = await axiosPrivate.post('/api/auth/logout');
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Axios error when logging out:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to logout');
        }

        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
    }
}