import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export async function fetchRecipes(type: string, value: string) {
  let endpoint = `${API_BASE_URL}/recipes`;

  if (type && value) {
    endpoint += `?${type}=${encodeURIComponent(value)}`;
  }

  return axios.get(endpoint);
}

export async function fetchRecipeDetails(id: string) {
  return axios.get(`${API_BASE_URL}/recipes/details?id=${id}`);
}