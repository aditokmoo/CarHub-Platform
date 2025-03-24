import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export default function useSocket(accessToken: string) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        if (accessToken) {
            const socketInstance = io(import.meta.env.VITE_BACKEND_URL, {
                auth: {
                    token: accessToken
                },
            });

            setSocket(socketInstance);

            socketInstance.on('connect', () => {
                console.log('Connected to socket');
            });

            socketInstance.on('getOnlineUsers', (data) => {
                setOnlineUsers(data)
            })

            return () => {
                socketInstance.disconnect();
            };
        }
    }, [accessToken]);

    return { socket, onlineUsers };
};
