import Meal from './Meal';
import AVAILABLE_MEALS from '../../../backend/data/available-meals.json';

export default function Meals() {
  return (
    <ul id='meals'>
      {AVAILABLE_MEALS.map((meal) => (
        <li key={meal.id} className='meal-item'>
          <Meal meal={meal} />
        </li>
      ))}
    </ul>
  );
}
