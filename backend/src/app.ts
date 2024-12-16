import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

// Routes
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import appointmentRoutes from './routes/appointmentRoutes'

// Error Controller
import { errorController } from './controllers/errorController';

const app: Express = express()

// middlewares
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/appointment', appointmentRoutes)

app.use(errorController);

app.use("*", (req, res, next) => {
    res.json({
        status: "error",
        message: `Can't find ${req.originalUrl} on this server!`,
    });
    next();
});


export default app;