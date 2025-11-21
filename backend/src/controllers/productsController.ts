import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function createProduct(req: Request, res: Response) {
  const partner = await prisma.partner.findFirst({ where: { userId: req.user!.id, type: 'lojista', status: 'approved' } });
  if (!partner) {
    return res.status(403).json({ message: 'Partner not approved or not lojista' });
  }
  const { name, description, category, price, stock, isActive, imageUrl } = req.body;
  const product = await prisma.product.create({
    data: { name, description, category, price, stock, isActive, imageUrl, partnerId: partner.id }
  });
  return res.status(201).json(product);
}

export async function listProducts(req: Request, res: Response) {
  const { category, partnerId, search } = req.query;
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: category ? String(category) : undefined,
      partnerId: partnerId ? Number(partnerId) : undefined,
      name: search ? { contains: String(search), mode: 'insensitive' } : undefined
    }
  });
  return res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const partner = await prisma.partner.findFirst({ where: { userId: req.user!.id, type: 'lojista' } });
  const product = await prisma.product.findFirst({ where: { id, partnerId: partner?.id } });
  if (!partner || !product) {
    return res.status(404).json({ message: 'Product not found or permission denied' });
  }
  const updated = await prisma.product.update({ where: { id }, data: req.body });
  return res.json(updated);
}

export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const partner = await prisma.partner.findFirst({ where: { userId: req.user!.id, type: 'lojista' } });
  const product = await prisma.product.findFirst({ where: { id, partnerId: partner?.id } });
  if (!partner || !product) {
    return res.status(404).json({ message: 'Product not found or permission denied' });
  }
  await prisma.product.delete({ where: { id } });
  return res.status(204).send();
}
