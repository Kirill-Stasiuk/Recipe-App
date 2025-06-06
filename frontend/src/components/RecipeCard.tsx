import { Link } from 'react-router-dom';
import type { RecipeCardProps } from '../types/recipe';

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${recipe.idMeal}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='recipe-card'>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
        <h4>{recipe.strMeal}</h4>
      </div>
    </Link>
  );
}
