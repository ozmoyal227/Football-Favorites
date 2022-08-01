import './App.css';
import React, { useState, useEffect } from 'react';
import constants from './constants';

function App() {

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${constants.API_BASE_URL}login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: 'happy',
            password: '123456',
            id: '111111'
          })
        });
        const data = await res.json();
        setAuthorized(data ? true : false);

      } catch (error) {
        console.log(error);
      }

    })();
  }, []);



  return (
    <div className="App">
      <p>{!authorized ? "you are not authorized" : "you are authorized"}</p>
    </div>
  );
}

export default App;
