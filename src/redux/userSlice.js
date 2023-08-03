import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchUserData,deleteUser } from '../db/api';



const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    isAuthenticated: false,
    userData: [],
  },
  reducers: {
    signInUser(state, action) {
      state.email = action.payload;
      state.isAuthenticated = true;
    },
    signOutUser(state) {
      state.email = '';
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        // You can update loading state or show a loader while the delete operation is in progress
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        // Filter out the deleted user from the userData array
        state.userData = state.userData.filter((user) => user.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { signInUser, signOutUser } = userSlice.actions;
export default userSlice.reducer;