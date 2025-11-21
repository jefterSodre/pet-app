import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function createAppointment(req: Request, res: Response) {
  const { petId, partnerId, serviceId, startDateTime, endDateTime, amount, paymentMethod } = req.body;
  const partner = await prisma.partner.findUnique({ where: { id: partnerId } });
  if (!partner || partner.type !== 'prestador' || partner.status !== 'approved') {
    return res.status(400).json({ message: 'Invalid partner' });
  }
  const appointment = await prisma.appointment.create({
    data: {
      petId,
      partnerId,
      serviceId,
      tutorId: req.user!.id,
      startDateTime: new Date(startDateTime),
      endDateTime: new Date(endDateTime),
      amount,
      paymentMethod,
      status: 'requested'
    }
  });
  return res.status(201).json(appointment);
}

export async function listAppointments(req: Request, res: Response) {
  if (req.user?.role === 'tutor') {
    const appointments = await prisma.appointment.findMany({ where: { tutorId: req.user.id } });
    return res.json(appointments);
  }
  if (req.user?.role === 'prestador') {
    const partner = await prisma.partner.findFirst({ where: { userId: req.user.id, type: 'prestador' } });
    const appointments = await prisma.appointment.findMany({ where: { partnerId: partner?.id } });
    return res.json(appointments);
  }
  return res.status(403).json({ message: 'Not allowed' });
}

export async function getAppointment(req: Request, res: Response) {
  const id = Number(req.params.id);
  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
  return res.json(appointment);
}

export async function updateAppointmentStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status } = req.body;
  const partner = await prisma.partner.findFirst({ where: { userId: req.user!.id, type: 'prestador' } });
  const appointment = await prisma.appointment.findFirst({ where: { id, partnerId: partner?.id } });
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found or permission denied' });
  }
  const updated = await prisma.appointment.update({ where: { id }, data: { status } });
  return res.json(updated);
}
