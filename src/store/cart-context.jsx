import { useReducer, createContext } from 'react';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updItemInCart: () => {}
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    console.log('add item - ', action.payload);
  }
  if (action.type == 'UPD_ITEM') {
    console.log('update item - ', action.payload.id, action.payload.change);
  }
}

export default function CartContextProvider({ children }) {
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
