import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function createPartner(req: Request, res: Response) {
  const { type, fantasyName, document, description, address } = req.body;
  if (req.user?.role !== 'prestador' && req.user?.role !== 'lojista') {
    return res.status(403).json({ message: 'Only partners can create profile' });
  }
  const addressRecord = await prisma.address.create({ data: { ...address, userId: req.user.id } });
  const partner = await prisma.partner.create({
    data: {
      type,
      fantasyName,
      document,
      description,
      addressId: addressRecord.id,
      userId: req.user.id,
      status: 'pending'
    }
  });
  return res.status(201).json(partner);
}

export async function listPartners(req: Request, res: Response) {
  const { type } = req.query;
  const partners = await prisma.partner.findMany({
    where: { type: type ? String(type) as any : undefined, status: 'approved' },
    include: { address: true }
  });
  return res.json(partners);
}

export async function getPartner(req: Request, res: Response) {
  const id = Number(req.params.id);
  const partner = await prisma.partner.findUnique({ where: { id }, include: { address: true, services: true, products: true } });
  if (!partner) {
    return res.status(404).json({ message: 'Partner not found' });
  }
  return res.json(partner);
}
