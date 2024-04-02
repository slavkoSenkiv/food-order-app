import { useContext } from 'react';
import CartContext from '../store/cart-context';

export default function Cart({ onCheckoutClick }) {
  const { cartMeals, updMealInCart, clearCart, getCartCost } = useContext(CartContext);

  return (
    <div className='cart'>
      <h2>Your Cart</h2>

      <ul>
        {cartMeals.map((mealObj) => (
          <li key={mealObj.meal.id} className='cart-item'>
            <p>
              {mealObj.meal.name} - {mealObj.quantity} x ${mealObj.meal.price}
            </p>
            <div className='cart-item-actions'>
              <button onClick={() => updMealInCart(mealObj.meal.id, -1)}>
                -
              </button>
              <p>{mealObj.quantity}</p>
              <button onClick={() => updMealInCart(mealObj.meal.id, 1)}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className='cart-total'>Total cost: {getCartCost()}</p>

      <div className='modal-actions'>
        {cartMeals.length > 0 && (
          <>
            <button onClick={clearCart} className='text-button'>
              Clear cart
            </button>
            <button onClick={onCheckoutClick} className='button'>
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
