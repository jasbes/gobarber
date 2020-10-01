import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'Jest',
      email: 'jest@etst.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with the same eamil as a existing one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'Jest',
      email: 'jest@test.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Jest',
        email: 'jest@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
