import { AxiosInstance } from "axios";
import axios from "../../../../api/http";
import { User } from "../../../../types";

export async function createAccount(credentials: User) {
    const formData = new FormData();

    Object.entries(credentials).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(file => formData.append(key, file));
        } else {
            formData.append(key, value);
        }
    });

    try {
        const res = await axios.post('/api/auth/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        
        return res.data;
    } catch (error) {
        console.error('Error creating account:', error);
        return error;
    }
}

export async function login(credentials: User) {
    try {
        const res = await axios.post('/api/auth/login', JSON.stringify(credentials), {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return res?.data;
    } catch (error) {
        return error
    }
}

export async function refreshToken() {
    try {
        const res = await axios.get('/api/auth/refresh', {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function logout(axiosPrivate: AxiosInstance) {
    try {
        const res = await axiosPrivate.post('/api/auth/logout');
        return res.data;
    } catch (error) {
        console.log(error)
        return error
    }
}