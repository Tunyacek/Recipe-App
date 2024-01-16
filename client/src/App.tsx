import  { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ greeting, setGreeting] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api')
      .then(response => {
        setGreeting(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {greeting ? (<p>{greeting}</p>) : (<p>Wait a second... who are you?</p>)}
    </>
  );
}

export default App
