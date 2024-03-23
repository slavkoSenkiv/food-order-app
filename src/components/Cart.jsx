import { useContext } from 'react';
import CartContext from '../store/cart-context';

export default function Cart() {
  const { cartMeals, updMealInCart, clearCart } = useContext(CartContext);

  const cartTotalCost = cartMeals.reduce(
    (total, mealObj) => total + mealObj.quantity * mealObj.meal.price,
    0
  );
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

      <div className='cart-total'>
        <p>Total cost: ${cartTotalCost}</p>
        {cartMeals.length > 0 && (
          <>
            <button onClick={clearCart} className='text-button'>
              Clear cart
            </button>
            <button onClick={} className='text-button'>
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
