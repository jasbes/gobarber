import { parseISO, startOfHour } from 'date-fns';
import { Router } from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepo = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepo.all();
  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDay = appointmentsRepo.findByDate(parsedDate);

  if (findAppointmentInSameDay) {
    return response
      .status(409)
      .json({ message: 'This appointment has already been booked.' });
  }

  const appointment = appointmentsRepo.create(provider, parsedDate);

  return response.status(201).json(appointment);
});

export default appointmentsRouter;
