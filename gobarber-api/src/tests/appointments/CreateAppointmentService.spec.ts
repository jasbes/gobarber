import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      user_id: '123456',
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should be able to create two appointements at the same time', async () => {
    const appointmentDate = new Date();

    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: '123456',
      provider_id: '123456',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        user_id: '123456',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
