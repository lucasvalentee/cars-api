import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    password,
    email,
    drive_license,
  }: ICreateUserDTO): Promise<void> {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    if (userEmailAlreadyExists) {
      throw new AppError('User already exists.');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      drive_license,
    });
  }
}

export default CreateUserUseCase;
