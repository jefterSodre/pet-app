import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function listPendingPartners(_req: Request, res: Response) {
  const partners = await prisma.partner.findMany({ where: { status: 'pending' }, include: { user: true, address: true } });
  return res.json(partners);
}

export async function updatePartnerStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status } = req.body;
  const partner = await prisma.partner.update({ where: { id }, data: { status } });
  return res.json(partner);
}

export async function adminOverview(_req: Request, res: Response) {
  const [users, partners, orders, appointments] = await Promise.all([
    prisma.user.count(),
    prisma.partner.count(),
    prisma.order.count(),
    prisma.appointment.count()
  ]);
  return res.json({ users, partners, orders, appointments });
}
