import logo from '../../../public/logo.jpg';
import CartContext from '../../store/cart-context';
import Modal from '../Modal';
import { useContext, useRef } from 'react';

export default function Header() {
  const { cartMeals } = useContext(CartContext);
  const modalRef = useRef();

  let mealsInCart = 0;
  if (cartMeals.length > 0) {
    cartMeals.forEach((meal) => (mealsInCart += meal.quantity));
  }

  return (
    <>
      <Modal ref={modalRef}>
        <h1>Hello!</h1>
        <h2>This is your cart</h2>
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
