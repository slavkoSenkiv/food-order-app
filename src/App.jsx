import { useEffect } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/meals')
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <>
      <Header />
      <Meals />
    </>
  );
}

export default App;
