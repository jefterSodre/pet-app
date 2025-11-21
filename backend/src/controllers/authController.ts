import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

const ACCESS_SECRET = process.env.JWT_SECRET || 'dev-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
const ACCESS_EXPIRES = '30m';
const REFRESH_EXPIRES = '7d';

function signAccess(userId: number) {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
}

function signRefresh(userId: number) {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}

export async function register(req: Request, res: Response) {
  const { name, email, password, phone, role } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, phone, passwordHash, role } });
    return res.status(201).json({ user, tokens: { accessToken: signAccess(user.id), refreshToken: signRefresh(user.id) } });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.json({
    user,
    tokens: { accessToken: signAccess(user.id), refreshToken: signRefresh(user.id) }
  });
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Missing refresh token' });
  }
  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { userId: number };
    const accessToken = signAccess(payload.userId);
    const newRefreshToken = signRefresh(payload.userId);
    return res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
}

export async function me(req: Request, res: Response) {
  return res.json({ user: req.user });
}
