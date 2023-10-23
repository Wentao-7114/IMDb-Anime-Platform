// import React from 'react';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import './App.css';
import AnimeList from './AnimeList';
import DataComponent from './DataComponent';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // user not log in
  useEffect(() => {
    // check whether currently log in or not
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        setLoggedIn(true);
    }
  }, []);
  const handleLogin = () => {
      setLoggedIn(true);
  }
  const handleSkip = () => {
    setLoggedIn(true);
  }
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // delete the symbol for already logged in
  }
  if (!loggedIn) {
      return <Login onLogin={handleLogin} onSkip={handleSkip}/>;
  }
  return (
    <div className="App">
      <AnimeList />
      <DataComponent />
      <button onClick={handleLogout}>Logout</button> {/* log out and go back to log in page */}
    </div>
  );
}

export default App;
