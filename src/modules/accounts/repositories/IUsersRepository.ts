import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';

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
