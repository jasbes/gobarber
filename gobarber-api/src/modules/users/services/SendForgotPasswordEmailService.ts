import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('EmailProvider') private emailProvider: IEmailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    await this.userTokensRepository.generate(user.id);

    await this.emailProvider.sendEmail(email, '');
  }
}

export default SendForgotPasswordEmailService;
