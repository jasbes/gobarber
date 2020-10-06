import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IUSersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;

  findById(id: string): Promise<User | undefined>;

  findByEmail(id: string): Promise<User | undefined>;

  create(data: ICreateUserDTO): Promise<User>;

  save(data: ICreateUserDTO): Promise<User>;
}
