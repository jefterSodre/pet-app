import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function createReview(req: Request, res: Response) {
  const { targetType, targetId, rating, comment } = req.body;
  const review = await prisma.review.create({ data: { targetType, targetId, rating, comment, authorId: req.user!.id } });
  return res.status(201).json(review);
}

export async function listReviews(req: Request, res: Response) {
  const { targetType, targetId } = req.query;
  const reviews = await prisma.review.findMany({
    where: {
      targetType: targetType ? String(targetType) : undefined,
      targetId: targetId ? Number(targetId) : undefined
    }
  });
  return res.json(reviews);
}
