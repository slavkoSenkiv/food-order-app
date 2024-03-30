import { useReducer, createContext, useEffect, useState } from 'react';
import MENU_MEALS from '../../backend/data/available-meals.json';
import { fetchCartMeals, updateCart } from '../../util/http';

const CartContext = createContext({
  cartMeals: [],
  addMealToCart: () => {},
  updMealInCart: () => {},
  clearCart: () => {},
  fetchCart: () => {},
  getCartCost: () => {},
  getCartVolume: () => {}
});

function tryCatch(fn, data) {
  try {
    fn(data);
  } catch (error) {
    console.log(error);
  }
}

function cartReducer(state, action) {
  const updCartMeals = [ ...state.cartMeals ];

  if (action.type === 'ADD_MEAL') {
    const mealToAddMenuIndex = MENU_MEALS.findIndex(
      (meal) => meal.id === action.payload
    );
    const mealToAdd = MENU_MEALS[mealToAddMenuIndex];
    const mealInCart = updCartMeals.find(
      (meal) => meal.meal.id === mealToAdd.id
    );

    if (mealInCart) {
      mealInCart.quantity += 1;
      tryCatch(updateCart, updCartMeals);
      return {
        ...state,
        cartMeals: updCartMeals
      };
    } else {
      const newMealObj = { meal: mealToAdd, quantity: 1 };
      updCartMeals.push(newMealObj);
      tryCatch(updateCart, updCartMeals);
      return {
        ...state,
        cartMeals: updCartMeals
      };;
    }
  }

  if (action.type === 'UPD_MEAL') {
    const mealToUpdate = updCartMeals.find(
      (mealObj) => mealObj.meal.id === action.payload.id
    );
    mealToUpdate.quantity += action.payload.change;
    if (mealToUpdate.quantity <= 0) {
      updCartMeals = updCartMeals.filter((mealObj) => {
        return mealObj.meal.id !== action.payload.id;
      });
    }
    tryCatch(updateCart, updCartMeals);
    return {
      ...state,
      cartMeals: updCartMeals
    };
  }

  if (action.type === 'CLEAR') {
    updCartMeals = [];
    tryCatch(updateCart, updCartMeals);
    return {
      ...state,
      cartMeals: updCartMeals
    };
  }

  if (action.type === 'FETCH_CART_DATA') {
    async function fetchMeals() {
      try {
        const fetchedCartMeals = await fetchCartMeals();
        updCartMeals = fetchedCartMeals;
      } catch (error) {
        console.log(error);
      }
    }
    fetchMeals();
    return {
      ...state,
      cartMeals: updCartMeals
    };
  }

  if (action.type === 'GET_TOTAL_CART_COST') {
    console.log(updCartMeals);
    const totalCartCost = updCartMeals.reduce(
      (total, mealObj) => total + mealObj.quantity || 1 * mealObj.meal.price,
      0
    );
    console.log(totalCartCost);
    //const formattedTotalCartCost = `$${totalCartCost.toFixed(2)}`
    //TODO maybe I have return the updated state in every case?
    return totalCartCost;
  }

  if (action.type === 'GET_CART_VOLUME') {
    console.log('updCartMeals', updCartMeals);
    if (updCartMeals.length === 0) {
      return 0;
    } else {
      const cartVolume = updCartMeals.reduce(
        (total, mealObj) => total + mealObj.quantity || 1,
        0
      );
      return cartVolume;
    }
  }
}

export function CartContextProvider({ children }) {
  const [fetchedCartContent, setFetchedCartContent] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const fetchedCartMeals = await fetchCartMeals();
        setFetchedCartContent(fetchedCartMeals);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMeals();
  }, []);

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    cartMeals: fetchedCartContent
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

  function getTotalCartCost() {
    cartDispatch({
      type: 'GET_TOTAL_CART_COST'
    });
  }
  function getCartVolume() {
    cartDispatch({
      type: 'GET_CART_VOLUME'
    });
  }

  const ctxValue = {
    cartMeals: cartState.cartMeals,
    addMealToCart: handleAddMealToCart,
    updMealInCart: handleUpdMealInCart,
    clearCart: handleClearCart,
    fetchCart: handleFetchCartData,
    getCartCost: getTotalCartCost,
    getCartVolume
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
