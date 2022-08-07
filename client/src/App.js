import './App.css';
import React, { useState, useEffect } from 'react';
// import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Main from './components/Main';

function App() {


  return (

    <div className="App">
      <Header />
      {/* <Sidebar /> */}
      <Main />
    </div>
  );
}

export default App;
