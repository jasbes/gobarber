import { injectable, inject } from 'tsyringe';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appointment[]> {
    const providerAppointments = await this.appointmentsRepository.findAllInDayByProvider(
      { provider_id, day, year, month },
    );

    return providerAppointments;
  }
}
