import './App.css';
import React, { useState, useEffect } from 'react';
import constants from './constants';
import Sidebar from './components/Sidebar';

function App() {

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${constants.API_BASE_URL}users`, {
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
      <Sidebar />
      <p>{!authorized ? "you are not authorized" : "you are authorized"}</p>
    </div>
  );
}

export default App;
