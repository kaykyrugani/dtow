import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import './config/container';
import { app } from './app';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 