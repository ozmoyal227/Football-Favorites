import './App.css';
import React, { useState, useEffect } from 'react';
import constants from '../constants';

function App() {

  const [data, setData] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${constants.API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user: 'mymy' })
        });
        const data = await res.json();
        console.log(data);

      } catch (error) {
        console.log(error);
      }

      // .then((data) => setData(data.authorized));  
    })();
  }, []);



  return (
    <div className="App">
      <p>{!data ? "you are not authorized" : "you are authorized"}</p>
    </div>
  );
}

export default App;
