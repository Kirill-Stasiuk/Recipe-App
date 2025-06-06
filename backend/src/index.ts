import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import recipeRoutes from './controllers/recipes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});