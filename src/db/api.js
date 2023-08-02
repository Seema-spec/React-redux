import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const API_BASE_URL = 'http://localhost:5000'; 

export const postFormData = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

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