import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from './store/CartContext';
import UserProgressContext from './store/UserProgressContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  let cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orders: {
          items: cartCtx.items,
          customer: customerData
        }
      })
    })
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Cart Total: {currencyFormatter.format(cartTotal)}</p>
        <Input label='Full Name' type='text' id='full-name' />
        <Input label='E-Mail Adress' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>
        <p>
          <Button type='button' textOnly onClick={handleClose}>
            Close
          </Button>
          <Button on>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
