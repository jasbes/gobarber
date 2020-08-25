import { parseISO } from 'date-fns';
import { Router } from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepo = new AppointmentsRepository();

appointmentsRouter.get('/', (_, response) => {
  const appointments = appointmentsRepo.all();
  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepo,
    );

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default appointmentsRouter;
