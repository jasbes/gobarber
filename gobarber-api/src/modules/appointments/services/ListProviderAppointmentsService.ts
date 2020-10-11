import { injectable, inject } from 'tsyringe';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let providerAppointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!providerAppointments) {
      providerAppointments = await this.appointmentsRepository.findAllInDayByProvider(
        { provider_id, day, year, month },
      );

      await this.cacheProvider.save(
        cacheKey,
        JSON.stringify(providerAppointments),
      );
    }

    return providerAppointments;
  }
}
