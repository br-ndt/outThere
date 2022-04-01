import express from 'express';

import apiRouter from './api/v1/apiRouter.js';

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  res.status(302).redirect('/api/v1');
})

rootRouter.use('/api/v1', apiRouter);

export default rootRouter;