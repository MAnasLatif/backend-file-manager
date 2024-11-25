import cors from 'cors';
import express from 'express';

import initializeSchema from '@/schema';
import errorHandler from '@/middleware/error.middleware';
import morgan from '@/middleware/morgan.middleware';
import notFound from '@/middleware/notFound.middleware';
import healthRouter from '@/routes/health.routes';
import appsRouter from '@/routes/apps.routes';

const app = express();
initializeSchema();

app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);

app.use(morgan);

app.use('/apps', appsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
