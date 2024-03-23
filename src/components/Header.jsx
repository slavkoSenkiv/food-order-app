import logo from '../../public/logo.jpg';
import CartContext from '../store/cart-context';
import Modal from './Modal';
import Cart from './Cart';
import { useContext, useRef } from 'react';
import Checkout from './Checkout';

export default function Header() {
  const { cartMeals } = useContext(CartContext);
  const cartRef = useRef();
  const checkoutRef = useRef();

  let mealsInCart = 0;
  if (cartMeals.length > 0) {
    cartMeals.forEach((meal) => (mealsInCart += meal.quantity));
  }

  return (
    <>
      <Modal ref={cartRef}>
        <Cart />
      </Modal>
      
      <Modal ref={checkoutRef}>
        <Checkout />
      </Modal>

      <header id='main-header'>
        <div id='title'>
          <img src={logo} />
          <h1>Reactfood</h1>
        </div>
        <button
          onClick={() => modalRef.current.open()}
          className='text-button'
        >{`Cart (${mealsInCart})`}</button>
      </header>
    </>
  );
}
