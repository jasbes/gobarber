import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ResetPassowordService from '@modules/users/services/ResetPassowordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const sendForgotPasswordEmailService = container.resolve(
      ResetPassowordService,
    );

    await sendForgotPasswordEmailService.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
