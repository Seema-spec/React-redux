// src/App.js
import React from 'react';
import { useSelector } from 'react-redux';
import SignInForm from './components/signinForm';
import WelcomePage from './components/welcomePage';

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      {isAuthenticated ? <WelcomePage /> : <SignInForm />}
    </div>
  );
};

export default App;
