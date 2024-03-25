import { fetchAvailableMeals } from '../util/http';
import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvider } from './store/cart-context';

export default function App() {

  fetchAvailableMeals();
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}
