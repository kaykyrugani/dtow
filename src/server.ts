import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './modules/admin/routes/auth.routes';
import { AppError } from './errors/AppError';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Error handling
app.use((err: Error, request: express.Request, response: express.Response, _: express.NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 