import express, { Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db';

import challangeRoutes from './routes/challangeRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/challanges', challangeRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: `, error);
    process.exit(1);
  }
}

startServer();