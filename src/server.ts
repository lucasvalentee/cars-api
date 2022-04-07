import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import '@shared/container';
import { DatabaseConfiguration } from '@database/index';

import router from './routes';
import swaggerFile from './swagger.json';
import { catchError } from './middlewares/catchError';

DatabaseConfiguration.startConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(catchError);

app.listen(3333, () => console.log('Server is running on port 3333!'));
