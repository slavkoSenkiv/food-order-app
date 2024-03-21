import { useContext } from 'react';
import { CartContext } from '../../store/cart-context';
const imagesPath = '../../../backend/public/';

export default function Meal({ meal }) {
  const { addItemToCart } = useContext(CartContext);
  const { image, name, price, description, id } = meal;
  return (
    <article>
      <img src={imagesPath + image} alt='' />
      <h3>{name}</h3>
      <p className='meal-item-price'>${price}</p>
      <p className='meal-item-description'>{description}</p>
      <div className='meal-item-actions'>
        <button onClick={() => addItemToCart(id)} className='button'>
          Add to cart
        </button>
      </div>
    </article>
  );
}
