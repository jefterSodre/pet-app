import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export function authMiddleware(required = true) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
      if (!required) {
        return next();
      }
      return res.status(401).json({ message: 'Missing authorization header' });
    }

    const [, token] = header.split(' ');
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
      const user = await prisma.user.findUnique({ where: { id: payload.userId } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid token user' });
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}

export function authorizeRoles(...roles: Array<'tutor' | 'prestador' | 'lojista' | 'admin'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return next();
  };
}
