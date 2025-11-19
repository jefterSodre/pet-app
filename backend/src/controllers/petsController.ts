import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function listPets(req: Request, res: Response) {
  const pets = await prisma.pet.findMany({ where: { tutorId: req.user!.id } });
  return res.json(pets);
}

export async function createPet(req: Request, res: Response) {
  const { name, species, breed, size, age, notes } = req.body;
  const pet = await prisma.pet.create({ data: { name, species, breed, size, age, notes, tutorId: req.user!.id } });
  return res.status(201).json(pet);
}

export async function updatePet(req: Request, res: Response) {
  const id = Number(req.params.id);
  const pet = await prisma.pet.findFirst({ where: { id, tutorId: req.user!.id } });
  if (!pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }
  const updated = await prisma.pet.update({ where: { id }, data: req.body });
  return res.json(updated);
}

export async function deletePet(req: Request, res: Response) {
  const id = Number(req.params.id);
  const pet = await prisma.pet.findFirst({ where: { id, tutorId: req.user!.id } });
  if (!pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }
  await prisma.pet.delete({ where: { id } });
  return res.status(204).send();
}
