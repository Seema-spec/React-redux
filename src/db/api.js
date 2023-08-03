import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = 'http://localhost:5000';

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to delete a user
export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (userId, { rejectWithValue }) => {
      try {
        await axios.delete(`${API_BASE_URL}/users/${userId}`);
        return userId; // Return the deleted user's ID to update the state
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  // Function to post form data
export const postFormData = async (formData) => {
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(`${API_BASE_URL}/users`, formData);
      return response.data;
    } catch (error) {
      throw new Error("Error posting form data: " + error.message);
    }
  };