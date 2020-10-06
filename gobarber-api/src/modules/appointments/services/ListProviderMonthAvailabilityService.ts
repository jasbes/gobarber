import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const providerAppointments = await this.appointmentsRepository.findAllInMonthByProvider(
      { provider_id, year, month },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const daysArray = Array.from(
      { length: numberOfDaysInMonth },
      (value, index) => index + 1,
    );

    const availability = daysArray.map(day => {
      const appointmentsInDay = providerAppointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}
