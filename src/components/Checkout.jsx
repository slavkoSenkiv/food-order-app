export default function Checkout({onBackToCartClick}) {
  return (
    <>
      <h1>this is Checkout</h1>
      <button onClick={onBackToCartClick} 
        className='text-button'>
        Back to cart
      </button>
    </>
  );
}
