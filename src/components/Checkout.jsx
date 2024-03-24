import { useContext } from 'react';
import CartContext from '../store/cart-context';
import Input from './Input';

export default function Checkout({ onBackToCartClick }) {
  const { cartMeals } = useContext(CartContext);
  const cartTotalCost = cartMeals.reduce(
    (total, mealObj) => total + mealObj.quantity * mealObj.meal.price,
    0
  );

  return (
    <div className='control'>
      <h2>Checkout</h2>
      <p>Total cost: ${cartTotalCost}</p>

      <Input label='Full Name' placeholder='Joe Doe' />
      <Input label='E-mail address' placeholder='joe.doe@gmail.com' />
      <div className='address-row'>
        <Input label='City' placeholder='Lviv' />
        <Input label='Street' placeholder='Plebania' />
        <Input label='Postal Code' placeholder='82100' />
      </div>

      <div className='modal-actions'>
        <button onClick={onBackToCartClick} className='text-button'>
          Back to cart
        </button>
        <button onClick={onBackToCartClick} className='button'>
          Submit Order
        </button>
      </div>
    </div>
  );
}
