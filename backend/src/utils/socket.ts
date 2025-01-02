import { Server } from 'socket.io';
import http from 'http';
import app from '../app';

const expressServer = http.createServer(app);

const io = new Server(expressServer, {
    cors: {
        origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
        credentials: true,
    }
});

console.log(123)

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`user disconnected: ${socket.id}`);
    });
});

export { io, expressServer };