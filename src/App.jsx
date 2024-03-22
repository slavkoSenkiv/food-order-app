import Modal from './components/Modal';
import Header from './components/header/Header';
import Meals from './components/menu/Meals';
import { CartContextProvider } from './store/cart-context';
import { useState } from 'react';


export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCartClick() {
    setModalIsOpen(true);
  }

  return (
    <CartContextProvider>
      <Modal open={modalIsOpen}/>
      <Header toggleCart={handleCartClick}/>
      <Meals/>
    </CartContextProvider>
  );
}
