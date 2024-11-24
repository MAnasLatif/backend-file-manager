import cors from 'cors';
import express from 'express';

import errorHandler from '@/middleware/error.middleware';
import morgan from '@/middleware/morgan.middleware';
import notFound from '@/middleware/notFound.middleware';
import healthRouter from '@/routes/health.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan);

app.use('/health', healthRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
