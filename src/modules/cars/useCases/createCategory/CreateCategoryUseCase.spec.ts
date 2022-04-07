import { AppError } from '@errors/AppError';
import CategoriesRepositoryInMemory from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import CreateCategoryUseCase from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const categoryDataToRequest = {
      name: 'Category Test',
      description: 'Category Description Test',
    };

    await createCategoryUseCase.execute(categoryDataToRequest);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      categoryDataToRequest.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with a duplicated name', async () => {
    expect(async () => {
      const categoryDataToRequest = {
        name: 'Category Test Duplicated',
        description: 'Category Description Test Duplicated',
      };

      await createCategoryUseCase.execute(categoryDataToRequest);

      await createCategoryUseCase.execute(categoryDataToRequest);
    }).rejects.toBeInstanceOf(AppError);
  });
});
