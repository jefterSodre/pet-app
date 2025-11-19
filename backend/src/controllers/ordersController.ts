import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function createOrder(req: Request, res: Response) {
  const { partnerId, addressId, items, paymentMethod } = req.body;
  const partner = await prisma.partner.findUnique({ where: { id: partnerId } });
  if (!partner || partner.type !== 'lojista' || partner.status !== 'approved') {
    return res.status(400).json({ message: 'Invalid partner' });
  }
  const totalAmount = items.reduce((sum: number, item: any) => sum + item.quantity * item.unitPrice, 0);
  const order = await prisma.order.create({
    data: {
      partnerId,
      tutorId: req.user!.id,
      addressId,
      status: 'new',
      paymentMethod,
      totalAmount,
      items: { create: items.map((i: any) => ({ productId: i.productId, quantity: i.quantity, unitPrice: i.unitPrice })) }
    },
    include: { items: true }
  });
  return res.status(201).json(order);
}

export async function listOrders(req: Request, res: Response) {
  if (req.user?.role === 'tutor') {
    const orders = await prisma.order.findMany({ where: { tutorId: req.user.id }, include: { items: true } });
    return res.json(orders);
  }
  if (req.user?.role === 'lojista') {
    const partner = await prisma.partner.findFirst({ where: { userId: req.user.id, type: 'lojista' } });
    const orders = await prisma.order.findMany({ where: { partnerId: partner?.id }, include: { items: true } });
    return res.json(orders);
  }
  return res.status(403).json({ message: 'Not allowed' });
}

export async function getOrder(req: Request, res: Response) {
  const id = Number(req.params.id);
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  if (req.user?.role === 'tutor' && order.tutorId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return res.json(order);
}

export async function updateOrderStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status } = req.body;
  const partner = await prisma.partner.findFirst({ where: { userId: req.user!.id, type: 'lojista' } });
  const order = await prisma.order.findFirst({ where: { id, partnerId: partner?.id } });
  if (!order) {
    return res.status(404).json({ message: 'Order not found or permission denied' });
  }
  const updated = await prisma.order.update({ where: { id }, data: { status } });
  return res.json(updated);
}
