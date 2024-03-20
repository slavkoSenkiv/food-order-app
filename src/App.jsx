import Header from './components/header/Header';
import Meals from './components/menu/Meals';
import AVAILABLE_MEALS from '../backend/data/available-meals.json'

export default function App() {
  return (
    <>
      <Header />
      <Meals meals={AVAILABLE_MEALS}/>
    </>
  )
}