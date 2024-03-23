import logo from '../../public/logo.jpg';
import CartContext from '../store/cart-context';
import Modal from './Modal';
import Cart from './Cart';
import { useContext, useRef, useState } from 'react';
import Checkout from './Checkout';

export default function Header() {
  const { cartMeals } = useContext(CartContext);
  const [modalContent, setModalContent] = useState();
  const cartRef = useRef();
  //const checkoutRef = useRef();

  let mealsInCart = 0;
  if (cartMeals.length > 0) {
    cartMeals.forEach((meal) => (mealsInCart += meal.quantity));
  }

  function handleCheckoutClick() {
    setModalContent((prevModalContent) =>
      prevModalContent === 'cart' ? 'checkout' : 'cart'
    );
  }

  function handleCartClick() {
    cartRef.current.open();
    setModalContent('cart');
  }

  return (
    <>
      <Modal ref={cartRef}>
        {modalContent === 'cart' ? (
          <Cart onCheckoutClick={handleCheckoutClick} />
        ) : (
          <Checkout onBackToCartClick={handleCartClick} />
        )}
      </Modal>

      <header id='main-header'>
        <div id='title'>
          <img src={logo} />
          <h1>Reactfood</h1>
        </div>
        <button
          onClick={handleCartClick}
          className='text-button'
        >{`Cart (${mealsInCart})`}</button>
      </header>
    </>
  );
}
