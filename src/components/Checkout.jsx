import { useContext, useState, useEffect } from 'react';
import CartContext from '../store/cart-context';
import Input from './Input';
import useInput from '../hooks/useInput';
import { isEmail, hasCorrectLength } from '../../util/validation';

export default function Checkout({ onBackToCartClick, onSubmitClick }) {
  const { cartMeals, clearCart } = useContext(CartContext);
  const cartTotalCost = cartMeals.reduce(
    (total, mealObj) => total + mealObj.quantity * mealObj.meal.price,
    0
  );

  const [startingValue, setStartingValue] = useState(() => {
    try {
      const cachedUserInfo = localStorage.getItem('cachedUserInfo');
      if (cachedUserInfo) {
        const userInfoObj = JSON.parse(cachedUserInfo);
        return JSON.parse(userInfoObj);
      } else {
        const blanckUserInfoObj = {
          fullName: '',
          email: '',
          city: '',
          street: '',
          postalCode: ''
        };
        localStorage.setItem(
          'cachedUserInfo',
          JSON.stringify(blanckUserInfoObj)
        );
        return blanckUserInfoObj;
      }
    } catch (error) {
      console.error('Error retrieving cached data:', error);
    }
  });

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleInputBlur,
    hasError: emailHasError
  } = useInput(
    'fullName',
    startingValue,
    (value) => isEmail(value) && hasCorrectLength(value, 5, 10)
  );

  function handleSubmit(event) {
    event.preventDefault();
    if (emailHasError) {
      return;
    }
    onSubmitClick();
    console.log('form submitted');
    clearCart();
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
        <div className='modal-actions'>
          <button onClick={onBackToCartClick} className='text-button'>
            Back to cart
          </button>
          <button type='submit' onClick={onSubmitClick} className='button'>
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}
