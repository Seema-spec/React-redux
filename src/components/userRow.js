// src/components/UserRow.js
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../db/api";
import "./common.css"

const UserRow = ({ user }) => {
  const dispatch = useDispatch();

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
