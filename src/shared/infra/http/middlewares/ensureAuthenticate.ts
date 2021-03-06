import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authorizationHeaders = request.headers.authorization;

  if (!authorizationHeaders) {
    throw new AppError('Token missing.', 401);
  }

  /**
   * [0] -> Bearer
   * [1] -> Token
   */
  const [, token] = authorizationHeaders.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '0c6785d4448739c360de53888192d7dc',
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists.', 401);
    }

    request.user = { id: user_id };

    next();
  } catch (error) {
    throw new AppError('Invalid token.', 401);
  }
}
