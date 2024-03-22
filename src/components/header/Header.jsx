import logo from '../../../public/logo.jpg';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

export default function Header({ toggleCart }) {
  const { cartMeals } = useContext(CartContext);

  let mealsInCart = 0;
  if (cartMeals.length > 0) {
    cartMeals.forEach((meal) => (mealsInCart += meal.quantity));
  }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logo} />
        <h1>Reactfood</h1>
      </div>
      <button
        onClick={toggleCart}
        className='text-button'
      >{`Cart (${mealsInCart})`}</button>
    </header>
  );
}
