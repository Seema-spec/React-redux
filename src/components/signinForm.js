// src/components/SignInForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../redux/userSlice';
import "./common.css";

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !email.match(emailRegex)) {
      setError('Please enter a valid email address.');
    } else {
      dispatch(signInUser(email));
      setError('');
    }
  };

  return (
    <div className='container'>
    <div className='form_container'>
    <form onSubmit={handleSubmit} >
      <h2 className='title'>Sign In</h2>
      <div>
        <label>Email:</label>
        <input
          className="text_box"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button className='button' type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
};

export default SignInForm;
