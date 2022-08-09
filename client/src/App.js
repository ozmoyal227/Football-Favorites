import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { UserProvider } from './components/context/UserProvider';

function App() {
  return (
    <UserProvider>
      <Header />
      <Main />
    </UserProvider>
  );
}

export default App;
