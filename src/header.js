import React, { useState , useEffect } from "react";

const DarkHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if accessToken is present in local storage
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return(<header style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 20px',
    color: 'white',
    // backgroundColor: '#333',
    // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }}>
    <a href='/' style={{ textDecoration: 'none' }}>
    <h2 className="title">
      Authentication Service
    </h2>
    </a>
    <nav style={{ display: 'flex' }}>
      {isLoggedIn ? (
        <a href='/logout' 
        style={{
          padding: '10px 20px',
          textDecoration: 'none',
        }}>
          Logout
        </a>
      ) : (
        <a href='/login' 
        style={{
          padding: '10px 20px',
          textDecoration: 'none',
        }}>
          Login
        </a>
      )}
    </nav>
  </header>)
};

export default DarkHeader;

  
