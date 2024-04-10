import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from './store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';

export default function Checkout() {
  const cartCtx = useContext(CartContext);

  let cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <Modal>
      <form action=''>
        <h2>Checkout</h2>
        <p>Cart Total: {currencyFormatter.format(cartTotal)}</p>
        <Input label='Full Name' type='text' id='full-name' />
        <Input label='E-Mail Adress' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>
      </form>
    </Modal>
  );
}
