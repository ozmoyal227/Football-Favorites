import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [data, setData] = React.useState(false);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.authorized));
  }, []);

  return (
    <div className="App">
      <p>{!data ? "you are not authorized" : "you are authorized"}</p>
    </div>
  );
}

export default App;
