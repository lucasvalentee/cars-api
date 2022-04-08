import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import User from '@modules/accounts/infra/typeorm/entities/User';

interface IUsersRepository {
  create({
    id,
    name,
    password,
    email,
    drive_license,
    avatar,
  }: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export default IUsersRepository;
