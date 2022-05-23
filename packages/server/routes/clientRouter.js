import express from 'express';
import clientIndexPath from '../config/clientIndexPath.js';

const clientRouter = new express.Router();

const clientRoutes = ['/', '/today', '/week'];

clientRouter.get(clientRoutes, (req, res) => {
  res.sendFile(clientIndexPath());
});

export default clientRouter;