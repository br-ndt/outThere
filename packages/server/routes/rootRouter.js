import express from 'express';

import apiRouter from './api/v1/apiRouter.js';
import clientRouter from './clientRouter.js';

const rootRouter = express.Router();

rootRouter.use('/api/v1', apiRouter);
rootRouter.use('/', clientRouter);

export default rootRouter;