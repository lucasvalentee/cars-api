import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import './shared/container';
import { DatabaseConfiguration } from './database';

import router from './routes';
import swaggerFile from './swagger.json';

DatabaseConfiguration.startConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log('Server is running on port 3333!'));
