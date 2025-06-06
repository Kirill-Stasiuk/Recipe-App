import express, { Request, Response, Router } from 'express';
import { makeApiCall } from '../helpers/apiCaller.js';

const router: Router = express.Router();

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

router.get('/', async (req: Request, res: Response) => {
  const { ingredient, country, category } = req.query;
  let url = `${API_BASE}/search.php?s=`;

  if (ingredient) {
    url = `${API_BASE}/filter.php?i=${ingredient}`;
  } else if (country) {
    url = `${API_BASE}/filter.php?a=${country}`;
  } else if (category) {
    url = `${API_BASE}/filter.php?c=${category}`;
  }

  makeApiCall(url, res, 'Failed to fetch recipes');
});

router.get('/details', async (req: Request, res: Response) => {
  const { id } = req.query;

  const recipeId = Array.isArray(id) ? id[0] : id;

  const url = `${API_BASE}/lookup.php?i=${recipeId}`;

  makeApiCall(url, res, 'Failed to fetch recipe details');
});

export default router;