import React from 'react';
import { useSelector } from 'react-redux';
import SignInForm from './components/signInForm';
import WelcomeUser from './components/welcomePage';
function App() {
  // Access the isAuthenticated state from the Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className='app'>
      {/* Conditionally render SignInForm or WelcomeUser based on isAuthenticated */}
      {isAuthenticated ? <WelcomeUser /> : <SignInForm />}
    </div>
  );
}

export default App;
