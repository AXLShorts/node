import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    status: 429,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth requests per windowMs
  message: {
    success: false,
    status: 429,
    message: 'Too many authentication attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const logRequests = (req: Request, _res: Response, next: NextFunction): void => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};
