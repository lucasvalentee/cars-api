import { Repository } from 'typeorm';

import DatabaseConfiguration from '@shared/infra/database/DatabaseConfiguration';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import User from '@modules/accounts/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository =
      DatabaseConfiguration.getDataSourceInstance().getRepository(User);
  }

  async create({
    id,
    name,
    password,
    email,
    drive_license,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      password,
      email,
      drive_license,
      avatar,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }
}

export default UsersRepository;
