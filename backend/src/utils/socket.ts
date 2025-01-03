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

io.on("connection", (socket: { id: string, on: (arg0: string, arg1: (message: string) => void) => void }) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

export { io, expressServer };
