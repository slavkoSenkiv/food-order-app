import { useContext, useState } from 'react';
import CartContext from '../store/cart-context';
import Input from './Input';
import useInput from '../hooks/useInput';
import { charCheck, hasCorrectLength } from '../../util/validation';
import { updateOrders } from '../../util/http';

export default function Checkout({ onBackToCartClick, onSubmitClick }) {
  const { cartMeals, clearCart } = useContext(CartContext);
  const cartTotalCost = cartMeals.reduce(
    (total, mealObj) => total + mealObj.quantity * mealObj.meal.price,
    0
  );

  const [orderInfo, setOrderInfo] = useState(() => {
    try {
      const cachedUserInfo = localStorage.getItem('cachedUserInfo');
      if (cachedUserInfo) {
        const userInfoObj = JSON.parse(cachedUserInfo);
        return { userInfo: userInfoObj, cartInfo: cartMeals };
      } else {
        const blankUserInfoObj = {
          fullName: '',
          email: '',
          city: '',
          street: '',
          postalCode: ''
        };
        return { userInfo: blankUserInfoObj, cartInfo: cartMeals };
      }
    } catch (error) {
      console.error('Error retrieving cached data:', error);
    }
  });

  const {
    value: fullNameValue,
    handleInputChange: handleFullNameChange,
    handleInputBlur: handleFullNameBlur,
    hasError: fullNameHasError
  } = useInput(
    'fullName',
    orderInfo.userInfo,
    (value) =>
      hasCorrectLength(value, 3, 10) &&
      charCheck(value, [' '], ['!', '*', '?', '.'])
  );

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError
  } = useInput(
    'email',
    orderInfo.userInfo,
    (value) =>
      hasCorrectLength(value, 5, 10) &&
      charCheck(value, ['@', '.'], ['!', '*', '?', ' '])
  );

  function handleSubmit(event) {
    event.preventDefault();
    try {
      updateOrders({ orderInfo });
    } catch (error) {
      console.log(error);
    }
    onSubmitClick();
    clearCart();
  }

  return (
    <div className='control'>
      <h2>Checkout</h2>
      <p>Total cost: ${cartTotalCost}</p>

      <form onSubmit={handleSubmit}>
        <Input
          label='Full Name'
          placeholder='Joe Doe'
          onChange={handleFullNameChange}
          onBlur={handleFullNameBlur}
          value={fullNameValue}
          error={fullNameHasError && 'plase enter a valid full name'}
        />

        <Input
          label='E-mail address'
          placeholder='joe.doe@gmail.com'
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
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
          <button type='submit' className='button'>
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}
