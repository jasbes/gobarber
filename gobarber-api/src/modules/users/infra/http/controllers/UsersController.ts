import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.status(201).json({ user: classToClass(user) });
  }
}
