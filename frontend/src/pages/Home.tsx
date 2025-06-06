import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { debounce } from 'lodash';
import { fetchRecipes } from '../api/recipe';
import type { Recipe } from '../types/recipe';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filterType, setFilterType] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const filterOptions = [
      { key: 'ingredient', value: searchParams.get('ingredient') },
      { key: 'country', value: searchParams.get('country') },
      { key: 'category', value: searchParams.get('category') },
    ];

    const selected = filterOptions.find(opt => opt.value !== null);

    const type = selected?.key ?? '';
    const value = selected?.value ?? '';

    setFilterType(type);
    setFilterValue(value);

    setLoading(true);
    fetchRecipes(type, value)
      .then((res) => setRecipes(res.data.meals || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchParams]);

  const debouncedUpdateParams = useCallback(
    debounce((type: string, value: string) => {
      const newParams = new URLSearchParams();
      if (type) {
        newParams.set(type, value);
      }
      setSearchParams(newParams);
    }, 500),
    [setSearchParams]
  );

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setFilterType(type);
    setFilterValue('');
    debouncedUpdateParams(type, '');
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    if (filterType) {
      debouncedUpdateParams(filterType, value);
    }
  };

  return (
    <div className='container'>
      <h1>Recipes</h1>

      <div className='filters'>
        <select value={filterType} onChange={handleTypeChange}>
          <option value="">Filter Type</option>
          <option value="ingredient">Ingredient</option>
          <option value="country">Country</option>
          <option value="category">Category</option>
        </select>

        <input
          placeholder="Enter filter value..."
          value={filterValue}
          onChange={handleValueChange}
        />
      </div>

      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}