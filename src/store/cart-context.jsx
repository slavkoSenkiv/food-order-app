import { useReducer, createContext } from 'react';
import MENU_MEALS from '../../backend/data/available-meals.json';
import { fetchCartMeals, updateCart } from '../../util/http';

const CartContext = createContext({
  cartMeals: [],
  addMealToCart: () => {},
  updMealInCart: () => {},
  clearCart: () => {},
  fetchCart: () => {}
});

function cartReducer(state, action) {
  const updState = { ...state };

  if (action.type === 'ADD_MEAL') {
    const mealToAddMenuIndex = MENU_MEALS.findIndex(
      (meal) => meal.id === action.payload
    );
    const mealToAdd = MENU_MEALS[mealToAddMenuIndex];
    const mealInCart = updState.cartMeals.find(
      (meal) => meal.meal.id === mealToAdd.id
    );
    if (mealInCart) {
      mealInCart.quantity += 1;
      return updState;
    } else {
      const newMealObj = { meal: mealToAdd, quantity: 1 };
      updState.cartMeals.push(newMealObj);

      try {
        updateCart(updState.cartMeals);
      } catch (error) {
        console.log(error);
      }

      return updState;
    }
  }

  if (action.type === 'UPD_MEAL') {
    const mealToUpdate = updState.cartMeals.find(
      (mealObj) => mealObj.meal.id === action.payload.id
    );
    mealToUpdate.quantity += action.payload.change;
    if (mealToUpdate.quantity <= 0) {
      updState.cartMeals = updState.cartMeals.filter((mealObj) => {
        return mealObj.meal.id !== action.payload.id;
      });
    }
    return updState;
  }

  if (action.type === 'CLEAR') {
    updState.cartMeals = [];
    return updState;
  }

  if (action.type === 'FETCH_CART_DATA') {
    async function fetchMeals() {
      try {
        const fetchedCartMeals = await fetchCartMeals();
        updState.cartMeals = fetchedCartMeals;
      } catch (error) {
        console.log('custom log for fetch cart error', error);
      }
    }
    console.log('1 run');
    fetchMeals();
    return updState;
  }
}

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    cartMeals: []
  });

  function handleAddMealToCart(id) {
    cartDispatch({
      type: 'ADD_MEAL',
      payload: id
    });
  }

  function handleUpdMealInCart(id, change) {
    cartDispatch({
      type: 'UPD_MEAL',
      payload: {
        id: id,
        change: change
      }
    });
  }

  function handleClearCart() {
    cartDispatch({
      type: 'CLEAR'
    });
  }

  function handleFetchCartData() {
    cartDispatch({
      type: 'FETCH_CART_DATA'
    });
  }

  const ctxValue = {
    cartMeals: cartState.cartMeals,
    addMealToCart: handleAddMealToCart,
    updMealInCart: handleUpdMealInCart,
    clearCart: handleClearCart,
    fetchCart: handleFetchCartData
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
