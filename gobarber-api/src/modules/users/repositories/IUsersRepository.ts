import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUSersRepository {
  findById(id: string): Promise<User | undefined>;

  findByEmail(id: string): Promise<User | undefined>;

  create(data: ICreateUserDTO): Promise<User>;

  save(data: ICreateUserDTO): Promise<User>;
}
