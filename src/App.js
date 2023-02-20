import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import DarkHeader from './header';

import LoginPage from './auth/login';
import LogoutPage from './auth/logout';
import SignupPage from './auth/signup';
import ProfilePage from './auth/profile';
import VerificationPage from './auth/verification';
import RedirectPage from './auth/redirect';

function App() {
  return (
    <div className="App">
      <nav>
        <DarkHeader />
      </nav>

      <Router>
        <Routes>
          <Route path='/' element={ <ProfilePage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/logout' element={ <LogoutPage /> } />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/verification' element={<VerificationPage />} />
          <Route path='/redirect' element={<RedirectPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
