const imagesPath = '../../../backend/public/';
export default function Meals({ meals }) {
  return (
    <ul id='meals'>
      {meals.map((meal) => (
        <li key={meal.id} className='meal-item'>
          <article>
            <img src={imagesPath + meal.image} alt='' />
            <h3>{meal.name}</h3>
            <p className='meal-item-price'>${meal.price}</p>
            <p className='meal-item-description'>{meal.description}</p>
            <div className='meal-item-actions'>
              <button className='button'>Add to cart</button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
