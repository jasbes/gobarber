import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ResetPassowordService from '@modules/users/services/ResetPassowordService';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassoword: ResetPassowordService;
let hashProvider: FakeHashProvider;

describe('ResetPassoword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    hashProvider = new FakeHashProvider();
    resetPassoword = new ResetPassowordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      hashProvider,
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jest',
      email: 'jest@test.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(hashProvider, 'generateHash');

    await resetPassoword.execute({
      token,
      password: '123123',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
    expect(generateHash).toHaveBeenCalledWith('123123');
  });

  it('should not be able to reset the password with non existing token', async () => {
    await expect(
      resetPassoword.execute({
        token: 'non-existing',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existing');
    await expect(
      resetPassoword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password after two hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jest',
      email: 'jest@test.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassoword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
