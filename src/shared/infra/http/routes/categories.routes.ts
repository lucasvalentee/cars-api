import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '@modules/cars/useCases/createCategory/CreateCategoryController';
import ImportCategoryController from '@modules/cars/useCases/importCategory/ImportCategoryController';
import ListCategoriesController from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticate';

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
  dest: './tmp',
});

const categoriesRoutes = Router();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export default categoriesRoutes;
