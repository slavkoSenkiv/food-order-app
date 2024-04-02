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

export async function updateOrders(userInfo) {
  const response = await fetch(`${BASE_URL}orders`, {
    method: 'PUT',
    body: JSON.stringify({ orderData: userInfo }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('failed to update orders');
  }
  return resData.message;
}

export async function fetchCartMeals() {
  /* While not strictly necessary for functionality, 
  you can modify fetchCartMeals to check localStorage first 
  before fetching from the server. 
  This can improve performance by avoiding unnecessary API calls.
  const localCart = localStorage.getItem('cart');
  if (localCart) {
    return JSON.parse(localCart);
  } */
  const response = await fetch(`${BASE_URL}cart`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('failed to fetch cart');
  }
  return resData.cartMeals;
}
