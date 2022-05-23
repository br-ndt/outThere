import express from 'express';
import clientIndexPath from '../config/clientIndexPath.js';

const clientRouter = new express.Router();

const clientRoutes = ['/', '/today', '/week'];

clientRouter.get(clientRoutes, (req, res) => {
  console.log("client route");
  res.sendFile(clientIndexPath());
});

export default clientRouter;