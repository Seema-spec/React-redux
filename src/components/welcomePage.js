import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/userSlice";
import { postFormData,fetchUserData } from "../db/api";
import UserTable from "./userTable";
import "./common.css"

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

  // Function to handle sign-out
  const handleSignOut = () => {
   window.location.href = "/";
  };
return (
    <div className="container">
    <div className="form_container">
      <div>
        <h2>Welcome, {Email}!</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Submit Your Information</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            className="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            className="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            className="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">Submit</button>
        <button className="button" >Sign Out</button>
      </form>
      </div>
      <UserTable data ={userData}/>
    </div>
  );
};

export default WelcomePage;