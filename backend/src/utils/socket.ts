import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import app from '../app';

const expressServer = http.createServer(app);

const io = new Server(expressServer, {
    cors: {
        origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
        credentials: true,
    }
});

io.use((socket: { handshake: { auth?: { token?: string; }; headers?: { authorization?: string; }; }; user?: any; }, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization;
    if (!token) {
        return next(new Error("Authentication error: Token missing"));
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN!);
        socket.user = decoded;
        next();
    } catch (error) {
        return next(new Error("Authentication error: Invalid token"));
    }
});

const newChatUsers: any = {}; // { userId: socketId }

io.on("connection", (socket: any) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('addNewChatUser', (userId: string) => {
        if (userId) {
            newChatUsers[userId] = socket.id;
            io.emit("getNewChatUsers", Object.keys(newChatUsers));
        }
    })

    console.log(newChatUsers)

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        const userId = Object.keys(newChatUsers).find(key => newChatUsers[key] === socket.id);
        if (userId) {
            delete newChatUsers[userId];
            io.emit("getNewChatUsers", Object.keys(newChatUsers));
        }
    });
});

export { io, expressServer };
