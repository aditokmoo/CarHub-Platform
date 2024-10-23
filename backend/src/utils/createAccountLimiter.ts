import rateLimit from 'express-rate-limit';

const createAccountLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 10,  // Limit to 10 requests per 15 minutes per IP
    message: 'Too many accounts created from this IP, please try again later.'
});

export default createAccountLimiter;