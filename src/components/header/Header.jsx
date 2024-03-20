import logo from '../../../public/logo.jpg';

export default function Header() {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logo} />
        <h1>Reactfood</h1>
      </div>
      <button className='text-button'>Cart</button>
    </header>
  );
}
