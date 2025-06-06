import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRecipeDetails, fetchRecipes } from '../api/recipe';
import type { Recipe } from '../types/recipe';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [related, setRelated] = useState<Recipe[]>([]);

  useEffect(() => {
    if (id) {
      fetchRecipeDetails(id)
        .then((res) => {
          const r = res.data.meals?.[0];
          setRecipe(r);

          if (r?.strCategory) {
            fetchRecipes('category', r.strCategory)
              .then((res) => setRelated(res.data.meals || []))
              .catch(console.error);
          }
        })
        .catch(console.error);
    }
  }, [id]);

  const ingredientsList = useMemo(() => {
    const ingredients = [];
    if (!recipe) return [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(
          <li
            key={i - 1}
            className="filter-link"
            onClick={() => handleClick('ingredient', ingredient)}
          >
            {ingredient}
          </li>
        );
      }
    }
    return ingredients;
  }, [recipe]);

  if (!recipe) return <p>Loading...</p>;

  const handleClick = (type: string, value: string) => {
    navigate(`/?${type}=${value}`);
  };

  const homePageButton = () => {
    navigate('/');
  }

  return (
    <div className='recipe-detail-container'>
      <div className="recipe-main">
        <h1>{recipe.strMeal}</h1>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
        <p>
          <strong>Country:</strong>{' '}
          <span
            className="filter-link"
            onClick={() => handleClick('country', recipe.strArea)}
          >
            {recipe.strArea}
          </span>
        </p>
        <p>
          <strong>Category:</strong>{' '}
          <span
            className="filter-link"
            onClick={() => handleClick('category', recipe.strCategory)}
          >
            {recipe.strCategory}
          </span>
        </p>
        <p><strong>Instructions:</strong> {recipe.strInstructions}</p>

        <div>
          <strong>Ingredients:</strong>
          <ul>{ingredientsList}</ul>
        </div>

        <div>
          <strong className='filter-link' onClick={homePageButton}>
            Go to home page
          </strong>
          </div>
      </div>

      <div className='recipe-sidebar'>
        <h3>Other {recipe.strCategory} recipes</h3>
        <ul>
          {related.map((r) => (
            <li key={r.idMeal}>
              <a
                href={`/recipe/${r.idMeal}`}
                className="filter-link"
              >
                {r.strMeal}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}