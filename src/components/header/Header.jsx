import logo from '../../../public/logo.jpg';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

export default function Header() {
  const { items } = useContext(CartContext);

  const cartVolume = items.length > 0 ? items.length : 0;

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logo} />
        <h1>Reactfood</h1>
      </div>
      <button className='text-button'>{`Cart (${cartVolume})`}</button>
    </header>
  );
}
