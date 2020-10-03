import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeEmailProvider from '@shared/container/providers/EmailProvider/fakes/FakeEmailProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeEmailProvider: FakeEmailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeEmailProvider = new FakeEmailProvider();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeEmailProvider,
    );
  });

  it('should be able to recover password using the email', async () => {
    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');

    await fakeUsersRepository.create({
      name: 'Jest',
      email: 'jest@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'jest@test.com',
    });

    expect(sendEmail).toHaveBeenCalledWith('jest@test.com', '');
  });

  it('should not be able to recover a non existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'jest@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jest',
      email: 'jest@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'jest@test.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
