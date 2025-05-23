import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Logging for each request
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// ✅ Register routes before starting server
app.use('/api/users', userRoutes);

// ✅ Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
}).catch((err) => {
  console.error('❌ Failed to connect to MongoDB:', err);
  process.exit(1); // Optional: shut down app if DB fails
});