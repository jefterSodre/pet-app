import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function createService(req: Request, res: Response) {
  const partner = await prisma.partner.findFirst({ where: { userId: req.user!.id, type: 'prestador', status: 'approved' } });
  if (!partner) {
    return res.status(403).json({ message: 'Partner not approved or not prestador' });
  }
  const { type, name, description, basePrice, unit, petSize, isActive } = req.body;
  const service = await prisma.service.create({ data: { type, name, description, basePrice, unit, petSize, isActive, partnerId: partner.id } });
  return res.status(201).json(service);
}

export async function listServices(req: Request, res: Response) {
  const { type, partnerId } = req.query;
  const services = await prisma.service.findMany({
    where: {
      isActive: true,
      type: type ? String(type) : undefined,
      partnerId: partnerId ? Number(partnerId) : undefined
    }
  });
  return res.json(services);
}

export async function getService(req: Request, res: Response) {
  const id = Number(req.params.id);
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  return res.json(service);
}

export async function updateService(req: Request, res: Response) {
  const id = Number(req.params.id);
  const partner = await prisma.partner.findFirst({ where: { userId: req.user!.id, type: 'prestador' } });
  const service = await prisma.service.findFirst({ where: { id, partnerId: partner?.id } });
  if (!partner || !service) {
    return res.status(404).json({ message: 'Service not found or permission denied' });
  }
  const updated = await prisma.service.update({ where: { id }, data: req.body });
  return res.json(updated);
}

export async function deleteService(req: Request, res: Response) {
  const id = Number(req.params.id);
  const partner = await prisma.partner.findFirst({ where: { userId: req.user!.id, type: 'prestador' } });
  const service = await prisma.service.findFirst({ where: { id, partnerId: partner?.id } });
  if (!partner || !service) {
    return res.status(404).json({ message: 'Service not found or permission denied' });
  }
  await prisma.service.delete({ where: { id } });
  return res.status(204).send();
}
