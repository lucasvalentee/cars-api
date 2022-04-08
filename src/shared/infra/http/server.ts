import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import '../../container';

import DatabaseConfiguration from '@shared/infra/database/DatabaseConfiguration';
import { catchError } from '@shared/infra/http/middlewares/catchError';
import router from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';

DatabaseConfiguration.startConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(catchError);

app.listen(3333, () => console.log('Server is running on port 3333!'));
