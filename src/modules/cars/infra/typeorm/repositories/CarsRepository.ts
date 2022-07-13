import { Repository } from 'typeorm';
import ICreateCarDTO from '@modules/cars/dto/ICreateCarDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import DatabaseConfiguration from '@shared/infra/database/DatabaseConfiguration';
import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository =
      DatabaseConfiguration.getDataSourceInstance().getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.repository.findOne({
      where: { license_plate },
    });

    return car;
  }
}

export default CarsRepository;
