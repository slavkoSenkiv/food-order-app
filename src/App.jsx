//import { useEffect } from 'react';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvider } from './components/store/CartContext';
import { UserProgressContextProvider } from './components/store/UserProgressContext';

function App() {
  /* useEffect(() => {
    fetch('http://localhost:3000/meals')
      .then((res) => res.json())
      .then(console.log);
  }, []); */

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}
