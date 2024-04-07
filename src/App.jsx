//import { useEffect } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvider } from './components/store/CartContext';

function App() {
  /* useEffect(() => {
    fetch('http://localhost:3000/meals')
      .then((res) => res.json())
      .then(console.log);
  }, []); */

  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
