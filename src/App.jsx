import Header from './components/header/Header';
import Meals from './components/menu/Meals';
import { CartContextProvider } from './store/cart-context';

export default function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals/>
    </CartContextProvider>
  );
}
