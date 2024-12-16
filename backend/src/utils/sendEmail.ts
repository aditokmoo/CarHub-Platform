import nodemailer from 'nodemailer';
import { User } from '../types/userTypes';

const sendEmail = async (user: User, confirmToken: string) => {
    const port = parseInt(process.env.EMAIL_PORT || '587', 10);
    const secure = process.env.EMAIL_SECURE === 'true';
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: port,
        secure: secure,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const message = {
        from: process.env.EMAIL_SENDER,
        to: user.email,
        subject: 'CarFix | Email verification',
        text: `${process.env.BACKEND_BASE_URL}/api/auth/verify/${confirmToken}`,
    };

    await transporter.sendMail(message);
};

export default sendEmail;