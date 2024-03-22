import { useReducer, createContext } from 'react';
import MENU_MEALS from '../../backend/data/available-meals.json';

const CartContext = createContext({
  cartMeals: [],
  addMealToCart: () => {},
  updMealInCart: () => {}
});

function cartReducer(state, action) {
  console.log('state', state);
  if (action.type === 'ADD_ITEM') {

    const mealToAddMenuIndex = MENU_MEALS.findIndex(
      (meal) => meal.id === action.payload);
    console.log('mealToAddMenuIndex', mealToAddMenuIndex);

    const mealToAdd = MENU_MEALS[mealToAddMenuIndex];
    console.log('mealToAdd', mealToAdd);

    const mealInCart = state.cartMeals.find((meal) => meal === mealToAdd);
    console.log('mealInCart', mealInCart);

    if (mealInCart) {
      console.log('meal quantity in the cart will be increased');


      return { ...state, mealInCart };

    } else {
      console.log('meal will be added to the cart');
      const obj = {meal: mealToAdd, quantity: 1}
      return { ...state, obj };
    }
  }
  if (action.type == 'UPD_ITEM') {
    console.log('update item - ', action.payload.id, action.payload.change);
    return { ...state };
  }
}

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { cartMeals: [] });

  function handleAddMealToCart(id) {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: id
    });
  }

  function handleUpdMealInCart(id, change) {
    cartDispatch({
      type: 'UPD_ITEM',
      payload: {
        id: id,
        change: change
      }
    });
  }

  const ctxValue = {
    cartMeals: cartState.cartMeals,
    addMealToCart: handleAddMealToCart,
    updMealInCart: handleUpdMealInCart
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
