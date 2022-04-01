import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import UsersRepository from '../modules/accounts/repositories/implementations/UsersRepository';

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
    const { sub: userId } = verify(
      token,
      '0c6785d4448739c360de53888192d7dc',
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists.', 401);
    }

    next();
  } catch (error) {
    throw new AppError('Invalid token.', 401);
  }
}
