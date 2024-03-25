import { useEffect, useState } from 'react';
import { fetchAvailableMeals } from '../../util/http';
import Meal from './Meal';

export default function Meals() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      try {
        const availableMealsData = await fetchAvailableMeals();
        setAvailableMeals(availableMealsData);
      } catch (error) {
      }
      setIsFetching(false);
    }
    fetchMeals();
  }, []);

  if (isFetching) {
    return <p>fetching</p>;
  }

  return (
    <ul id='meals'>
      {availableMeals.map((meal) => (
        <li key={meal.id} className='meal-item'>
          <Meal meal={meal} />
        </li>
      ))}
    </ul>
  );
}
