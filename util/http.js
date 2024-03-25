const BASE_URL = 'http://localhost:3000/';

export async function fetchAvailableMeals() {
  const response = await fetch(`${BASE_URL}available-meals`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('failed to fetch available meals');
  }
  return resData.availableMeals;
}
