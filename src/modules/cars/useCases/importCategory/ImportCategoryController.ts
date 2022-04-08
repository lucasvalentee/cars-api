import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ImportCategoryUseCase from '@modules/cars/useCases/importCategory/ImportCategoryUseCase';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    importCategoryUseCase.execute(file);

    return response.status(201).send();
  }
}

export default ImportCategoryController;
