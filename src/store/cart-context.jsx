import { useReducer, createContext } from 'react';
import AVAILABLE_MEALS from '../../backend/data/available-meals.json';

const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updItemInCart: () => {}
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updMeals = [...state.items];
    const itemToAddIndex = AVAILABLE_MEALS.findIndex(
      (meal) => meal.id === action.payload
    );
    // look into ecom prop drilling

    console.log('add item - ', action.payload);
    console.log(state);
    return { ...state, itemToAdd };
  }
  if (action.type == 'UPD_ITEM') {
    console.log('update item - ', action.payload.id, action.payload.change);
    return { ...state };
  }
}

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

  function handleAddItemToCart(id) {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: id
    });
  }

  function handleUpdItemInCart(id, change) {
    cartDispatch({
      type: 'UPD_ITEM',
      payload: {
        id: id,
        change: change
      }
    });
  }

  const ctxValue = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updItemInCart: handleUpdItemInCart
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
