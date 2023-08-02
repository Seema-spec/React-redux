// src/components/NewForm.js
import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { postFormData,fetchUserData } from "../db/api";
import UserTable from "./userTable";
import './common.css'
import SignInForm from "./signinForm";
const WelcomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState([]);

  const dispatch = useDispatch();
  const Email = useSelector((state) => state.user.email);
  const fetchedUserData = useSelector((state) => state.user.userData);

  useEffect(() => {
    // Fetch user data when the component mounts
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    setUserData(fetchedUserData);
  }, [fetchedUserData]);

  console.log(userData,"userData");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming the data is valid, you can dispatch the data to the Redux store
    const formData = {
      name,
      email,
      phone,
    };
    try {
      // Post form data using Axios
      await postFormData(formData);

      // Dispatch the data to the Redux store
      dispatch(signInUser(email));

      setUserData([...userData, formData]);
    } catch (error) {
      console.error('Error posting form data:', error);
    }
  };

  const signOut = () =>{
    window.location.href = "/";
  }

  return (
    <div className="container">
      <div className="form_container">
      <div className="heading">
        <h2>Welcome, {Email}!</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className="title">Submit Your Information</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            className="text_box"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            className="text_box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            className="text_box"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">Submit</button>
        <button className="button" onClick={signOut}>Sign Out</button>
      </form>
      </div>
      <UserTable data={userData} />
    </div>
  );
};

export default WelcomePage;
