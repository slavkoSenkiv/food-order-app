import logo from '../../public/logo.jpg';
import CartContext from '../store/cart-context';
import Modal from './Modal';
import Cart from './Cart';
import { useContext, useEffect, useRef, useState } from 'react';
import Checkout from './Checkout';
import ThankYouPopup from './ThankYouPopup';

export default function Header() {
  const { cartMeals, fetchCart } = useContext(CartContext);
  
  useEffect(() => {
    fetchCart();
  }, [cartMeals]);

  const [modalContent, setModalContent] = useState();
  const cartRef = useRef();

  let mealsInCart = cartMeals.reduce((total, meal) => total + meal.quantity, 0);

  function handleCartClick() {
    cartRef.current.open();
    setModalContent('cart');
  }

  function handleCheckoutClick() {
    setModalContent('checkout');
  }

  function handleSubmitCheckout() {
    setModalContent('thankYouPopup');
  }

  return (
    <>
      <Modal ref={cartRef}>
        {modalContent === 'cart' && (
          <Cart onCheckoutClick={handleCheckoutClick} />
        )}
        {modalContent === 'checkout' && (
          <Checkout
            onBackToCartClick={handleCartClick}
            onSubmitClick={handleSubmitCheckout}
          />
        )}
        {modalContent === 'thankYouPopup' && <ThankYouPopup />}
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
