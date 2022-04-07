import { Router } from 'express';

import CreateSpecificationController from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticate';

const createSpecificationController = new CreateSpecificationController();

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);

export default specificationsRoutes;
