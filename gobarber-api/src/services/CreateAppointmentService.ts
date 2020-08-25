import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

export class CreateAppointmentService {
  constructor(private repo: AppointmentRepository) {}

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDay = this.repo.findByDate(appointmentDate);

    if (findAppointmentInSameDay) {
      throw Error('This appointment has already been booked.');
    }

    const appointment = this.repo.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
