import { useContext } from 'react';
import CartContext from '../store/cart-context';
import Input from './Input';
import useInput from '../hooks/useInput';
import { isEmail, hasCorrectLength } from '../util/validation';

export default function Checkout({ onBackToCartClick, handleSubmitCheckout }) {
  const { cartMeals } = useContext(CartContext);
  const cartTotalCost = cartMeals.reduce(
    (total, mealObj) => total + mealObj.quantity * mealObj.meal.price,
    0
  );

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleInputBlur,
    hasError: emailHasError
  } = useInput('', (value) => isEmail(value) && hasCorrectLength(value, 5, 10));

  function handleSubmit(event) {
    event.preventDefauld();
    if (emailHasError) {
      return;
    }
    handleSubmitCheckout();
    console.log('form submitted');
  }
  return (
    <div className='control'>
      <h2>Checkout</h2>
      <p>Total cost: ${cartTotalCost}</p>

      <form onSubmit={handleSubmit}>
        <Input label='Full Name' placeholder='Joe Doe' />
        <Input
          label='E-mail address'
          placeholder='joe.doe@gmail.com'
          onChange={handleEmailChange}
          onBlur={handleInputBlur}
          value={emailValue}
          error={emailHasError && 'please enter a valid email'}
        />
        <div className='address-row'>
          <Input label='City' placeholder='Lviv' />
          <Input label='Street' placeholder='Plebania' />
          <Input label='Postal Code' placeholder='82100' />
        </div>
      </form>

      <div className='modal-actions'>
        <button onClick={onBackToCartClick} className='text-button'>
          Back to cart
        </button>
        <button type='submit' className='button'>
          Submit Order
        </button>
      </div>
    </div>
  );
}
