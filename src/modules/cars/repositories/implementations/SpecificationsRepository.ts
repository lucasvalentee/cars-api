import { Repository } from 'typeorm';
import { DatabaseConfiguration } from '../../../../database';
import Specification from '../../entities/Specification';
import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository =
      DatabaseConfiguration.getDataSourceInstance().getRepository(
        Specification,
      );
  }

  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }
}

export default SpecificationsRepository;
