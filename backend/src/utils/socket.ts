import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import app from '../app';
import Conversation from '../models/Conversation';

const expressServer = http.createServer(app);

const io = new Server(expressServer, {
    cors: {
        origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
        credentials: true,
    }
});

const userSocketMap: any = {};
const newChatUsers: any = {};

export const getReceiverSocketId = (receiverId: string) => {
    return (newChatUsers as any)[receiverId];
};

console.log(newChatUsers)

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



io.on("connection", (socket: any) => {
    console.log(`User connected: ${socket.id}`);

    const loggedUserId = socket.user.UserInfo.id;
    if (loggedUserId) userSocketMap[loggedUserId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('addNewChatUser', async () => {
        const conversations = await Conversation.find({ members: loggedUserId }).populate('members', '_id')

        if (conversations) {
            io.to(loggedUserId).emit("getChatUsers", conversations);
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);

        const userId = Object.keys(newChatUsers).find(key => newChatUsers[key] === socket.id);
        if (userId) {
            delete newChatUsers[userId];
            io.to(userId).emit("getChatUsers", Object.keys(newChatUsers));
        }

        delete userSocketMap[loggedUserId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});


export { io, expressServer };
