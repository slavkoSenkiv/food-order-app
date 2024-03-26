const BASE_URL = 'http://localhost:3000/';

export async function fetchAvailableMeals() {
  const response = await fetch(`${BASE_URL}available-meals`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('failed to fetch available meals');
  }
  return resData.availableMeals;
}

export async function updateCart(cartMeals) {
  console.log('http', cartMeals);
  const response = await fetch(`${BASE_URL}cart`, {
    method: 'PUT',
    body: JSON.stringify({ cartMeals }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('failed to update cart meals');
  }
  return resData.message;
}

export async function fetchCartMeals() {
  const response = await fetch(`${BASE_URL}cart`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('failed to fetch cart');
  }
  return resData.cartMeals;
}
