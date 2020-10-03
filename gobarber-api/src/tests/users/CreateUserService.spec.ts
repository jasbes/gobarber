import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Jest',
      email: 'jest@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with the same email as a existing one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Jest',
      email: 'jest@test.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Jest',
        email: 'jest@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
